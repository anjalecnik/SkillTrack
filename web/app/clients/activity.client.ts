import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import dayjs from "dayjs";
import { DEFAULT_PAGINATION_LIMIT, WORKSPACE_URL } from "~/constants";
import {
  IActivitiesOverviewResponse,
  IActivitiesResponse,
  IActivity,
  IActivityByIdResponse,
  IActivityParams,
  IActivityResponse,
  IBusinessTripActivityReq,
  IDailyActivityReq,
  IExpensesActivityReq,
  IGetActivitiesRequest,
  IOnCallActivityReq,
  IOvertimeActivityReq,
  IPlanAbsenceCreateReq,
  ITripToOfficeActivityReq,
  IWorkspaceEmployeeParams,
  SearchParam,
  PaginatedResponse,
  IUnassignedActivitiesResponse,
} from "~/types";
import { IGetUnassignedActivities } from "~/types/interfaces/activity/requests/get-unassigned-activities.request";
import { IPerformanceReviewActivityReq } from "~/types/interfaces/activity/requests/performance-review-activity.request";
import { IUserPerformanceDetails } from "~/types/interfaces/performance-review/user-performance-details";
import { IUsersPerformanceReviews } from "~/types/interfaces/performance-review/users-performance-reviews-table";
import { correctActivityDates, formatDate } from "~/util";
import { formDataClient, privateClient } from "~/util/api";

export class ActivityClient {
  // static async getActivitiesOnDay(
  //   workspaceId: number,
  //   args: IGetActivitiesRequest
  // ): Promise<IActivitiesResponse> {
  //   const { data } = await privateClient.get<IActivitiesResponse>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${args.userId}/activities`,
  //     {
  //       params: {
  //         fromDateStart: args.dateStart,
  //         toDateEnd: args.dateEnd,
  //       },
  //     }
  //   );
  //   data.activities = correctActivityDates(
  //     data.activities
  //   ) as IActivityResponse[];
  //   return data;
  // }
  // static async getActivities(
  //   loaderArgs: ClientLoaderFunctionArgs,
  //   args: IGetActivitiesRequest
  // ): Promise<IActivitiesResponse> {
  //   const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  //   const query = params.get(SearchParam.SortActivities);
  //   const [field, direction] = query?.split(":") ?? [];
  //   const projectIds = params.get("projectIds")?.split(",");
  //   const dateStart = args.dateStart || params.get(SearchParam.StartDate);
  //   const dateEnd = args.dateEnd || params.get(SearchParam.EndDate);
  //   const fromDateStart = dateStart
  //     ? formatDate(dateStart, "YYYY-MM-DD", "YYYY-MM-DD")
  //     : formatDate(dayjs().subtract(1, "week"), undefined, "YYYY-MM-DD");
  //   const toDateEnd = dateEnd
  //     ? formatDate(dateEnd, "YYYY-MM-DD", "YYYY-MM-DD")
  //     : formatDate(dayjs(), undefined, "YYYY-MM-DD");
  //   const { data } = await privateClient.get<IActivitiesResponse>(
  //     `${WORKSPACE_URL}/${loaderArgs.params.workspaceId}/workspace-users/${args.userId}/activities`,
  //     {
  //       params: {
  //         sortingDir: direction,
  //         sort: field,
  //         projectIds,
  //         fromDateStart,
  //         toDateEnd,
  //       },
  //     }
  //   );
  //   data.activities = correctActivityDates(
  //     data.activities
  //   ) as IActivityResponse[];
  //   return data;
  // }
  // static async getActivitiesOverview(
  //   loaderArgs: ClientLoaderFunctionArgs,
  //   limit: number = DEFAULT_PAGINATION_LIMIT
  // ): Promise<IActivitiesOverviewResponse> {
  //   const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  //   const getUnnasignedActivities = params.get("getUnnasignedActivities");
  //   const getPendingActivities = params.get("getPendingActivities");
  //   const page = params.get("page");
  //   const dateStart = params.get("startDate");
  //   const dateEnd = params.get("endDate");
  //   const fromDateStart = dateStart
  //     ? formatDate(dateStart, "YYYY-MM-DD", "YYYY-MM-DD")
  //     : formatDate(dayjs().subtract(1, "week"), undefined, "YYYY-MM-DD");
  //   const toDateEnd = dateEnd
  //     ? formatDate(dateEnd, "YYYY-MM-DD", "YYYY-MM-DD")
  //     : formatDate(dayjs(), undefined, "YYYY-MM-DD");
  //   const { data } = await privateClient.get<IActivitiesOverviewResponse>(
  //     `${WORKSPACE_URL}/${loaderArgs.params.workspaceId}/activities`,
  //     {
  //       params: {
  //         fromDateStart,
  //         toDateEnd,
  //         getUnnasignedActivities,
  //         getPendingActivities,
  //         limit,
  //         page: page && parseInt(page),
  //       },
  //     }
  //   );
  //   return data;
  // }
  // static async getActivityById(
  //   loaderArgs: ClientLoaderFunctionArgs | IActivityParams
  // ): Promise<IActivity> {
  //   const { workspaceId, userId, activityId } =
  //     "params" in loaderArgs ? loaderArgs.params : loaderArgs;
  //   const { data } = await privateClient.get<IActivity>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${userId}/activities/${activityId}`
  //   );
  //   return data;
  // }
  // static async getLatestReportedProject(
  //   loaderArgs: ClientLoaderFunctionArgs | IWorkspaceEmployeeParams
  // ) {
  //   const { workspaceId, employeeId } =
  //     "params" in loaderArgs ? loaderArgs.params : loaderArgs;
  //   const { data } = await privateClient.get<IActivityByIdResponse | "">(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities/prefill-daily-activity-request`
  //   );
  //   // Empty response means no activity found
  //   if (!data) {
  //     return null;
  //   }
  //   return data;
  // }
  // static async getUnassignedActivities(
  //   workspaceId: number,
  //   args: IGetUnassignedActivities
  // ) {
  //   const { data } = await privateClient.get<
  //     IUnassignedActivitiesResponse | ""
  //   >(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${args.employeeId}/warnings`,
  //     {
  //       params: {
  //         fromDateStart: args.fromDateStart,
  //         toDateEnd: args.toDateEnd,
  //       },
  //     }
  //   );
  //   if (!data) {
  //     return null;
  //   }
  //   return data.activities;
  // }
  // static async getLastDailyActivity(
  //   loaderArgs: ClientLoaderFunctionArgs | IWorkspaceEmployeeParams,
  //   params: {
  //     date: string;
  //   }
  // ): Promise<IActivityByIdResponse | null> {
  //   const { date } = params;
  //   const { workspaceId, employeeId } =
  //     "params" in loaderArgs ? loaderArgs.params : loaderArgs;
  //   const { data } = await privateClient.get<IActivityByIdResponse | "">(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities/last-daily-activity-request?date=${date}`
  //   );
  //   // Empty response means no activity found
  //   if (!data) {
  //     return null;
  //   }
  //   return data;
  // }
  // static async createActivity(
  //   actionArgs: ClientActionFunctionArgs | IWorkspaceEmployeeParams,
  //   reportedActivity:
  //     | IPlanAbsenceCreateReq
  //     | IOvertimeActivityReq
  //     | IBusinessTripActivityReq
  //     | IDailyActivityReq
  //     | IOnCallActivityReq
  //     | ITripToOfficeActivityReq
  //     | IPerformanceReviewActivityReq
  // ): Promise<IActivityResponse> {
  //   const { workspaceId, employeeId } =
  //     "params" in actionArgs ? actionArgs.params : actionArgs;
  //   const { data } = await privateClient.post<IActivityResponse>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities`,
  //     reportedActivity
  //   );
  //   return data;
  // }
  // static async updateActivity(
  //   actionArgs: ClientActionFunctionArgs | IWorkspaceEmployeeParams,
  //   activityRequestId: number,
  //   reportedActivity:
  //     | IDailyActivityReq
  //     | IBusinessTripActivityReq
  //     | ITripToOfficeActivityReq
  //     | IPerformanceReviewActivityReq
  // ): Promise<IActivityResponse> {
  //   const { workspaceId, employeeId } =
  //     "params" in actionArgs ? actionArgs.params : actionArgs;
  //   const { data } = await privateClient.put<IActivityResponse>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities/${activityRequestId}`,
  //     reportedActivity
  //   );
  //   return data;
  // }
  // static async createExpensesActivity(
  //   actionArgs: ClientActionFunctionArgs | IWorkspaceEmployeeParams,
  //   reportedActivity: IExpensesActivityReq
  // ): Promise<IActivityResponse> {
  //   const { workspaceId, employeeId } =
  //     "params" in actionArgs ? actionArgs.params : actionArgs;
  //   const { data } = await formDataClient.post<IActivityResponse>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities`,
  //     reportedActivity
  //   );
  //   return data;
  // }
  // static async deleteActivity(
  //   actionArgs: ClientActionFunctionArgs | IWorkspaceEmployeeParams,
  //   activityRequestId: number
  // ): Promise<void> {
  //   const { workspaceId, employeeId } =
  //     "params" in actionArgs ? actionArgs.params : actionArgs;
  //   return await privateClient.delete(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities/${activityRequestId}`
  //   );
  // }
  // static async getUsersPerformanceReviewsActivity(
  //   loaderArgs: ClientLoaderFunctionArgs,
  //   limit: number = 0
  // ): Promise<PaginatedResponse<IUsersPerformanceReviews>> {
  //   const { workspaceId } =
  //     "params" in loaderArgs ? loaderArgs.params : loaderArgs;
  //   const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  //   const year = params.get(SearchParam.Year) ?? dayjs().year();
  //   const query = params.get(SearchParam.Sort);
  //   const [field, direction] = query?.split(":") ?? [];
  //   const search = params.get(SearchParam.Search);
  //   const page = params.get(SearchParam.Page);
  //   const { data } = await privateClient.get<
  //     PaginatedResponse<IUsersPerformanceReviews>
  //   >(
  //     `${WORKSPACE_URL}/${workspaceId}/activities/workspace-performance-reviews`,
  //     {
  //       params: {
  //         sortingDir: direction,
  //         sort: field,
  //         fullName: search,
  //         page: page ? parseInt(page) : undefined,
  //         limit,
  //         year,
  //       },
  //     }
  //   );
  //   return data;
  // }
  // static async getUserPerformanceReviews(
  //   loaderArgs: ClientLoaderFunctionArgs
  // ): Promise<IUserPerformanceDetails[]> {
  //   const { workspaceId, employeeId } =
  //     "params" in loaderArgs ? loaderArgs.params : loaderArgs;
  //   const { data } = await privateClient.get<IUserPerformanceDetails[]>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/activities/performance-reviews`
  //   );
  //   return data;
  // }
}
