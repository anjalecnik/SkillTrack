import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import dayjs from "dayjs";
import { DEFAULT_PAGINATION_LIMIT } from "~/constants";
import {
  IActivitiesOverviewResponse,
  IActivitiesResponse,
  IActivity,
  IActivityByIdResponse,
  IActivityParams,
  IActivityResponse,
  IBusinessTripActivityReq,
  IDailyActivityReq,
  IGetActivitiesRequest,
  IPlanAbsenceCreateReq,
  IEmployeeParams,
  SearchParam,
  PaginatedResponse,
} from "~/types";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";
import { IUserPerformanceDetails } from "~/types/interfaces/performance-review/user-performance-details";
import { IUsersPerformanceReviews } from "~/types/interfaces/performance-review/users-performance-reviews-table";
import { correctActivityDates, formatDate } from "~/util";
import { privateClient } from "~/util/api";

export class ActivityClient {
  static async getActivitiesOnDay(
    args: IGetActivitiesRequest
  ): Promise<IActivitiesResponse> {
    const { data } = await privateClient.get<IActivitiesResponse>(
      `/users/${args.userId}/activities`,
      {
        params: {
          fromDateStart: args.dateStart,
          toDateEnd: args.dateEnd,
        },
      }
    );
    data.activities = correctActivityDates(
      data.activities
    ) as IActivityResponse[];
    return data;
  }

  static async getActivities(
    loaderArgs: ClientLoaderFunctionArgs,
    args: IGetActivitiesRequest
  ): Promise<IActivitiesResponse> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
    const query = params.get(SearchParam.SortActivities);
    const [field, direction] = query?.split(":") ?? [];
    const projectIds = params.get("projectIds")?.split(",");
    const dateStart = args.dateStart || params.get(SearchParam.StartDate);
    const dateEnd = args.dateEnd || params.get(SearchParam.EndDate);
    const fromDateStart = dateStart
      ? formatDate(dateStart, "YYYY-MM-DD", "YYYY-MM-DD")
      : formatDate(dayjs().subtract(1, "week"), undefined, "YYYY-MM-DD");
    const toDateEnd = dateEnd
      ? formatDate(dateEnd, "YYYY-MM-DD", "YYYY-MM-DD")
      : formatDate(dayjs(), undefined, "YYYY-MM-DD");
    const { data } = await privateClient.get<IActivitiesResponse>(
      `/users/${args.userId}/activities`,
      {
        params: {
          sortingDir: direction,
          sort: field,
          projectIds,
          fromDateStart,
          toDateEnd,
        },
      }
    );
    data.activities = correctActivityDates(
      data.activities
    ) as IActivityResponse[];
    return data;
  }

  static async getActivitiesOverview(
    loaderArgs: ClientLoaderFunctionArgs,
    limit: number = DEFAULT_PAGINATION_LIMIT
  ): Promise<IActivitiesOverviewResponse> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
    const getUnnasignedActivities = params.get("getUnnasignedActivities");
    const getPendingActivities = params.get("getPendingActivities");
    const page = params.get("page");
    const dateStart = params.get("startDate");
    const dateEnd = params.get("endDate");
    const fromDateStart = dateStart
      ? formatDate(dateStart, "YYYY-MM-DD", "YYYY-MM-DD")
      : formatDate(dayjs().subtract(1, "week"), undefined, "YYYY-MM-DD");
    const toDateEnd = dateEnd
      ? formatDate(dateEnd, "YYYY-MM-DD", "YYYY-MM-DD")
      : formatDate(dayjs(), undefined, "YYYY-MM-DD");
    const { data } = await privateClient.get<IActivitiesOverviewResponse>(
      `/activities`,
      {
        params: {
          fromDateStart,
          toDateEnd,
          getUnnasignedActivities,
          getPendingActivities,
          limit,
          page: page && parseInt(page),
        },
      }
    );
    return data;
  }

  static async getActivityById(
    loaderArgs: ClientLoaderFunctionArgs | IActivityParams
  ): Promise<IActivity> {
    const { userId, activityId } =
      "params" in loaderArgs ? loaderArgs.params : loaderArgs;
    const { data } = await privateClient.get<IActivity>(
      `/users/${userId}/activities/${activityId}`
    );
    return data;
  }

  static async getLatestReportedProject(
    loaderArgs: ClientLoaderFunctionArgs | IEmployeeParams
  ) {
    const { employeeId } =
      "params" in loaderArgs ? loaderArgs.params : loaderArgs;
    const { data } = await privateClient.get<IActivityByIdResponse | "">(
      `/users/${employeeId}/activities/prefill-daily-activity-request`
    );
    // Empty response means no activity found
    if (!data) {
      return null;
    }
    return data;
  }

  static async getLastDailyActivity(
    loaderArgs: ClientLoaderFunctionArgs | IEmployeeParams,
    params: {
      date: string;
    }
  ): Promise<IActivityByIdResponse | null> {
    const { date } = params;
    const { employeeId } =
      "params" in loaderArgs ? loaderArgs.params : loaderArgs;
    const { data } = await privateClient.get<IActivityByIdResponse | "">(
      `/users/${employeeId}/activities/last-daily-activity-request?date=${date}`
    );
    // Empty response means no activity found
    if (!data) {
      return null;
    }
    return data;
  }

  static async createActivity(
    actionArgs: ClientActionFunctionArgs | IEmployeeParams,
    reportedActivity:
      | IPlanAbsenceCreateReq
      | IBusinessTripActivityReq
      | IDailyActivityReq
      | IPerformanceReviewActivityReq
  ): Promise<IActivityResponse> {
    const { employeeId } =
      "params" in actionArgs ? actionArgs.params : actionArgs;
    const { data } = await privateClient.post<IActivityResponse>(
      `/users/${employeeId}/activities`,
      reportedActivity
    );
    return data;
  }

  static async updateActivity(
    actionArgs: ClientActionFunctionArgs | IEmployeeParams,
    activityRequestId: number,
    reportedActivity:
      | IDailyActivityReq
      | IBusinessTripActivityReq
      | IPerformanceReviewActivityReq
  ): Promise<IActivityResponse> {
    const { employeeId } =
      "params" in actionArgs ? actionArgs.params : actionArgs;
    const { data } = await privateClient.put<IActivityResponse>(
      `/users/${employeeId}/activities/${activityRequestId}`,
      reportedActivity
    );
    return data;
  }

  static async deleteActivity(
    actionArgs: ClientActionFunctionArgs | IEmployeeParams,
    activityRequestId: number
  ): Promise<void> {
    const { employeeId } =
      "params" in actionArgs ? actionArgs.params : actionArgs;
    return await privateClient.delete(
      `/users/${employeeId}/activities/${activityRequestId}`
    );
  }

  static async getUsersPerformanceReviewsActivity(
    loaderArgs: ClientLoaderFunctionArgs,
    limit: number = 0
  ): Promise<PaginatedResponse<IUsersPerformanceReviews>> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);

    const year = params.get(SearchParam.Year) ?? dayjs().year();
    const query = params.get(SearchParam.Sort);

    const [field, direction] = query?.split(":") ?? [];

    const search = params.get(SearchParam.Search);
    const page = params.get(SearchParam.Page);

    const { data } = await privateClient.get<
      PaginatedResponse<IUsersPerformanceReviews>
    >(
      `/activities/performance-reviews`,
      {
        params: {
          sortingDir: direction,
          sort: field,
          fullName: search,
          page: page ? parseInt(page) : undefined,
          limit,
          year,
        },
      }
    );

    return data;
  }

  static async getUserPerformanceReviews(
    loaderArgs: ClientLoaderFunctionArgs
  ): Promise<IUserPerformanceDetails[]> {
    const { employeeId } =
      "params" in loaderArgs ? loaderArgs.params : loaderArgs;
    const { data } = await privateClient.get<IUserPerformanceDetails[]>(
      `/users/${employeeId}/activities/performance-reviews`
    );
    return data;
  }
}
