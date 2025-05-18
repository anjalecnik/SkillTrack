import dayjs from "dayjs";
import {
  IActivitiesResponse,
  IActivity,
  IActivityResponse,
  IActivityTableItem,
  ActivityStatus,
  ActivityType,
} from "~/types";

export function mapActivityResponseToTableActivities(
  activitiesResponse: IActivitiesResponse,
  isDateStartAscending: boolean
): IActivityTableItem[] {
  const processedRequestIds = new Set<number>();
  const activitiesWithDates: IActivity[] =
    activitiesResponse.activities.flatMap((activity: IActivityResponse) => {
      if (
        activity.dateStart &&
        activity.dateEnd &&
        (activity.activityType === ActivityType.BusinessTrip ||
          activity.activityType === ActivityType.TripToOffice ||
          activity.activityType === ActivityType.OnCall)
      ) {
        if (processedRequestIds.has(activity.activityRequestId)) return []; // Process each requestId once to avoid multi-day duplicates
        processedRequestIds.add(activity.activityRequestId);

        const activitiesWithSameRequestId =
          activitiesResponse.activities.filter(
            (a) => a.activityRequestId === activity.activityRequestId
          );
        const { first, last } = activitiesWithSameRequestId.reduce(
          (acc, a) => {
            if (dayjs(a.date).isBefore(dayjs(acc.first.date))) {
              acc.first = a;
            }
            if (dayjs(a.date).isAfter(dayjs(acc.last.date))) {
              acc.last = a;
            }
            return acc;
          },
          { first: activity, last: activity }
        );

        return activitiesWithSameRequestId.map((a) => {
          const isFirst = isDateStartAscending
            ? a.id === first.id
            : a.id === last.id;
          const isLast = isDateStartAscending
            ? a.id === last.id
            : a.id === first.id;

          const activityMeta =
            activity.activityType === ActivityType.BusinessTrip ||
            activity.activityType === ActivityType.TripToOffice
              ? { isFirst: isFirst, isLast: isLast }
              : { firstOnCall: isFirst, lastOnCall: isLast };

          return {
            ...a,
            ...activityMeta,
          };
        });
      }

      return [activity];
    });

  // join together activities with the same date
  const activitiesWithDatesJoined: IActivityTableItem[] =
    activitiesWithDates.reduce((acc, activity) => {
      const { date } = activity;
      const exsistingDate = acc.find((a) =>
        dayjs(a.date).isSame(dayjs(activity.date), "day")
      );
      if (exsistingDate) {
        exsistingDate.activities.push(activity);
      }
      const index = acc.findIndex((a) =>
        dayjs(a.date).isSame(dayjs(activity.date), "day")
      );
      if (index === -1) {
        acc.push({ date, activities: [activity] });
      }

      return acc;
    }, [] as IActivityTableItem[]);

  const hiddenStatuses = [ActivityStatus.Canceled, ActivityStatus.Rejected];

  const activitiesWithGhosts = addGhostActivitiesForOverlaps(
    activitiesWithDatesJoined
  );

  return activitiesWithGhosts.filter((activity) => {
    activity.activities = activity.activities.filter(
      (a) => !hiddenStatuses.includes(a.status)
    );
    return activity.activities.length > 0;
  });
}

export function addGhostActivitiesForOverlaps(
  activitiesWithDatesJoined: IActivityTableItem[]
): IActivityTableItem[] {
  // Group BusinessTrip and TripToOffice activities by date
  const groupedByDate: Record<string, IActivity[]> = {};
  for (const day of activitiesWithDatesJoined) {
    for (const activity of day.activities) {
      if (
        activity.activityType === "BusinessTrip" ||
        activity.activityType === "TripToOffice"
      ) {
        if (!groupedByDate[day.date]) groupedByDate[day.date] = [];
        groupedByDate[day.date].push(activity);
      }
    }
  }

  // Find which activity requestId-s are appear on the same day
  const relatedIds: Record<number, Set<number>> = {};
  for (const activities of Object.values(groupedByDate)) {
    const ids = activities
      .map((a) => a.activityRequestId)
      .filter((id): id is number => typeof id === "number");

    for (const id of ids) {
      if (!relatedIds[id]) relatedIds[id] = new Set();
      for (const otherId of ids) {
        if (id !== otherId) {
          relatedIds[id].add(otherId);
        }
      }
    }
  }

  // Group requestIds that are connected through overlaps
  const visited = new Set<number>();
  const transitiveGroups: number[][] = [];

  for (const idStr in relatedIds) {
    const id = Number(idStr);
    if (visited.has(id)) continue;

    const group: number[] = [];
    const queue = [id];

    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current)) continue;

      visited.add(current);
      group.push(current);

      for (const neighbor of relatedIds[current]) {
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
        }
      }
    }

    if (group.length > 1) {
      transitiveGroups.push(group);
    }
  }

  //  Request info
  const requestIdWithActivity: Record<number, IActivity> = {};
  const requestFirstDate: Record<number, string> = {};
  const requestAllDates: Record<number, Set<string>> = {};

  for (const { date, activities } of activitiesWithDatesJoined) {
    for (const activity of activities) {
      const id = activity.activityRequestId;
      if (typeof id !== "number") continue;

      if (!requestIdWithActivity[id]) requestIdWithActivity[id] = activity;
      if (!requestFirstDate[id]) requestFirstDate[id] = date;

      if (!requestAllDates[id]) requestAllDates[id] = new Set();
      requestAllDates[id].add(date);
    }
  }

  const dateToActivities: Record<string, IActivity[]> = {};
  for (const day of activitiesWithDatesJoined) {
    dateToActivities[day.date] = [...day.activities];
  }

  // Add ghost activities based on group appearances
  for (const group of transitiveGroups) {
    const allDates = new Set<string>();

    for (const id of group) {
      requestAllDates[id]?.forEach((d) => allDates.add(d));
    }

    for (const date of allDates) {
      const dayActivities = dateToActivities[date] ?? [];
      const existingIds = new Set(
        dayActivities
          .map((a) => a.activityRequestId)
          .filter((id): id is number => typeof id === "number")
      );

      const baseActivity = dayActivities.find((a) =>
        group.includes(a.activityRequestId!)
      );

      for (const id of group) {
        const alreadyExists = existingIds.has(id);
        const realActivity = requestIdWithActivity[id];

        if (alreadyExists || !realActivity) continue; // Skip if already marked on this day or activity is missing

        const ghostActivity: IActivity = {
          ...realActivity,
          isGhost: true,
        };

        const shouldInsertAtFront =
          baseActivity?.activityType === "TripToOffice" &&
          ghostActivity.activityType === "BusinessTrip";

        const isSameType =
          baseActivity?.activityType === ghostActivity.activityType;

        const comesFromLaterDate = dayjs(requestFirstDate[id]).isAfter(
          dayjs(date)
        );

        if (shouldInsertAtFront || (isSameType && comesFromLaterDate)) {
          dayActivities.unshift(ghostActivity);
        } else {
          dayActivities.push(ghostActivity);
        }

        existingIds.add(id);
      }

      // Sort activities by the date they first appeared
      dayActivities.sort((a, b) => {
        const aDate = a.activityRequestId
          ? dayjs(requestFirstDate[a.activityRequestId])
          : dayjs();
        const bDate = b.activityRequestId
          ? dayjs(requestFirstDate[b.activityRequestId])
          : dayjs();
        return aDate.diff(bDate);
      });

      dateToActivities[date] = dayActivities;
    }
  }

  return activitiesWithDatesJoined.map(({ date }) => ({
    date,
    activities: dateToActivities[date] ?? [],
  }));
}
