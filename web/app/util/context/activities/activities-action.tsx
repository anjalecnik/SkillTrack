import {
  IOvertimeActivityReq,
  IPlanAbsenceCreateReq,
  IWorkspaceEmployeeParams,
  IBusinessTripActivityReq,
  IOnCallActivityReq,
  IExpensesActivityReq,
  SpecialLeaveActivityType,
  PlanAbsenceActivityType,
  ITripToOfficeActivityReq,
} from "~/types";
import {
  ExpensesTripSubmissionType,
  onCallSubmissionType,
  OvertimeSubmissionType,
  PlanAbsenceSubmissionType,
  BusinessTripSubmissionType,
  TripToOfficeSubmissionType,
} from "~/schemas";
import { ActivityClient } from "~/clients";
import { formatDate } from "~/util";
import dayjs from "dayjs";

export async function createAbsencePlanActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: PlanAbsenceSubmissionType
) {
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    activityType,
    description,
    specialLeaveActivityType,
  } = activitySubmission;

  const isOtherSpecialAcitivityType =
    specialLeaveActivityType === SpecialLeaveActivityType.Other;

  const reportedActivity: IPlanAbsenceCreateReq = {
    dateStart:
      activityType === PlanAbsenceActivityType.SickLeave
        ? {
            date: formatDate(dateStart, "DD.MM.YYYY"),
            time: timeStart ?? dayjs().startOf("day").format("HH:mm"),
          }
        : formatDate(dateStart, "DD.MM.YYYY")!,
    dateEnd:
      activityType === PlanAbsenceActivityType.SickLeave
        ? {
            date: formatDate(dateEnd, "DD.MM.YYYY"),
            time: timeEnd ?? dayjs().endOf("day").format("HH:mm"),
          }
        : formatDate(dateEnd, "DD.MM.YYYY")!,
    activityType,
    description: isOtherSpecialAcitivityType
      ? description
      : specialLeaveActivityType,
  };

  await ActivityClient.createActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}

export async function createOvertimeActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: OvertimeSubmissionType
) {
  const { activityType, date, startTime, endTime, projectId, description } =
    activitySubmission;
  const reportedActivity: IOvertimeActivityReq = {
    activityType,
    dateStart: {
      date: formatDate(date, "DD.MM.YYYY", "YYYY-MM-DD"),
      time: startTime,
    },
    dateEnd: {
      date: formatDate(date, "DD.MM.YYYY", "YYYY-MM-DD"),
      time: endTime,
    },
    projectId,
    description,
  };

  await ActivityClient.createActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}

export async function createBusinessTripActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: BusinessTripSubmissionType
) {
  const {
    activityType,
    dateStart,
    departureTime,
    dateEnd,
    returnTime,
    projectId,
    description,
    distanceInKM,
    location,
  } = activitySubmission;

  const reportedActivity: IBusinessTripActivityReq = {
    dateStart: {
      date: formatDate(dateStart, "DD.MM.YYYY"),
      time: departureTime,
    },
    dateEnd: {
      date: formatDate(dateEnd, "DD.MM.YYYY"),
      time: returnTime,
    },
    activityType,
    projectId,
    description,
    distanceInKM,
    location,
  };

  await ActivityClient.createActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}
export async function createTripToOfficeActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: TripToOfficeSubmissionType
) {
  const {
    activityType,
    dateStart,
    departureTime,
    dateEnd,
    returnTime,
    projectId,
    description,
    distanceInKM,
    locationFrom,
    locationTo,
  } = activitySubmission;

  const reportedActivity: ITripToOfficeActivityReq = {
    dateStart: {
      date: formatDate(dateStart, "DD.MM.YYYY") || "",
      time: departureTime,
    },
    dateEnd: {
      date: formatDate(dateEnd, "DD.MM.YYYY") || "",
      time: returnTime,
    },
    activityType,
    projectId,
    description,
    distanceInKM,
    locationFrom,
    locationTo,
  };

  await ActivityClient.createActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}

export async function createOnCallActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: onCallSubmissionType
) {
  const {
    activityType,
    dateEnd,
    dateStart,
    endTime,
    projectId,
    description,
    startTime,
  } = activitySubmission;

  const reportedActivity: IOnCallActivityReq = {
    dateStart: {
      date: formatDate(dateStart, "DD.MM.YYYY"),
      time: startTime,
    },
    dateEnd: {
      date: formatDate(dateEnd, "DD.MM.YYYY"),
      time: endTime,
    },
    activityType,
    projectId,
    description,
  };

  await ActivityClient.createActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}

export async function createExpensesActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activitySubmission: ExpensesTripSubmissionType
) {
  const {
    activityType,
    date,
    projectId,
    valueInEuro,
    isPaidWithCompanyCard,
    file,
    description,
  } = activitySubmission;

  const reportedActivity: IExpensesActivityReq = {
    date: formatDate(date, "DD.MM.YYYY"),
    activityType,
    projectId,
    valueInEuro,
    description,
    isPaidWithCompanyCard,
    file,
  };

  await ActivityClient.createExpensesActivity(
    workspaceEmployeeParams,
    reportedActivity
  );
}

export async function updateBusinessTripActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activityRequestId: number,
  activitySubmission: BusinessTripSubmissionType
) {
  const {
    activityType,
    dateStart,
    departureTime,
    dateEnd,
    returnTime,
    projectId,
    description,
    distanceInKM,
    location,
  } = activitySubmission;

  const updatedActivity: IBusinessTripActivityReq = {
    dateStart: {
      date: formatDate(dateStart, "DD.MM.YYYY"),
      time: departureTime,
    },
    dateEnd: {
      date: formatDate(dateEnd, "DD.MM.YYYY"),
      time: returnTime,
    },
    activityType,
    projectId,
    description,
    distanceInKM,
    location,
  };
  await ActivityClient.updateActivity(
    workspaceEmployeeParams,
    activityRequestId,
    updatedActivity
  );
}

export async function updateTripToOfficeActivity(
  workspaceEmployeeParams: IWorkspaceEmployeeParams,
  activityRequestId: number,
  activitySubmission: TripToOfficeSubmissionType
) {
  const {
    activityType,
    dateStart,
    departureTime,
    dateEnd,
    returnTime,
    projectId,
    description,
    distanceInKM,
    locationFrom,
    locationTo,
  } = activitySubmission;

  const updatedActivity: ITripToOfficeActivityReq = {
    dateStart: {
      date: formatDate(dateStart, "DD.MM.YYYY"),
      time: departureTime,
    },
    dateEnd: {
      date: formatDate(dateEnd, "DD.MM.YYYY"),
      time: returnTime,
    },
    activityType,
    projectId,
    description,
    distanceInKM,
    locationFrom,
    locationTo,
  };
  await ActivityClient.updateActivity(
    workspaceEmployeeParams,
    activityRequestId,
    updatedActivity
  );
}
