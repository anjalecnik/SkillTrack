import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import dayjs from "dayjs";
import { WORKSPACE_URL } from "~/constants";
import {
  IGetActivitiesRequest,
  IRequestsResponse,
  ActivityStatus,
  IWorkspaceEmployeeParams,
  IRequestUpdateRequest,
  IActivity,
  ActivityType,
  IActivityParams,
  HalPaginatedResponse,
  SearchParam,
} from "~/types";
import { correctActivityDates, formatDate, privateClient } from "~/util";

export class RequestClient {
  // static async getRequests(
  //   loaderArgs: ClientLoaderFunctionArgs,
  //   args: IGetActivitiesRequest
  // ): Promise<IRequestsResponse> {
  //   const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
  //   const query = params.get("sortActivities");
  //   const [field, direction] = query?.split(":") ?? [];
  //   const { absencesOnly } = args;
  //   const statuses = !absencesOnly
  //     ? params.get(SearchParam.RequestStatuses)?.split(",") || ActivityStatus.PendingApproval
  //     : [];
  //   const types = absencesOnly
  //     ? [
  //         ActivityType.SchoolSchedule,
  //         ActivityType.SickLeave,
  //         ActivityType.SpecialLeave,
  //         ActivityType.Vacation,
  //         ActivityType.TripToOffice,
  //       ]
  //     : params.get("types")?.split(",");
  //   const dateStart = args.dateStart || params.get("startDate");
  //   const dateEnd = args.dateEnd || params.get("endDate");
  //   const fromDateStart = dateStart
  //     ? formatDate(dateStart, "YYYY-MM-DD")
  //     : formatDate(dayjs().subtract(1, "week"), "YYYY-MM-DD");
  //   const toDateEnd = dateEnd
  //     ? formatDate(dateEnd, "YYYY-MM-DD")
  //     : formatDate(dayjs(), "YYYY-MM-DD");
  //   const { data } = await privateClient.get<IRequestsResponse>(
  //     `${WORKSPACE_URL}/${loaderArgs.params.workspaceId}/workspace-users/${args.userId}/activities/requests`,
  //     {
  //       params: {
  //         sortingDir: direction,
  //         sort: field,
  //         types,
  //         statuses,
  //         fromDateStart,
  //         toDateEnd,
  //       },
  //     }
  //   );
  //   data.requests = correctActivityDates(data.requests) as IActivity[];
  //   return data;
  // }

  static async getRequestsOverview(
    loaderArgs: ClientLoaderFunctionArgs,
    args: IGetActivitiesRequest,
    limit: number,
    showOnlyUserRequests?: boolean
  ): Promise<HalPaginatedResponse<IRequestsResponse>> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);
    const query = params.get(SearchParam.Sort);
    const page = params.get(SearchParam.Page);
    const [field, direction] = query?.split(":") ?? [];
    const statuses =
      params.get(SearchParam.RequestStatuses)?.split(",") ||
      ActivityStatus.PendingApproval;
    const defaultTypes = [
      ActivityType.BusinessTrip,
      ActivityType.SickLeave,
      ActivityType.Vacation,
    ];
    const types = params.get(SearchParam.Types)?.split(",") || defaultTypes;
    const showSubordinatesByLevel =
      params.get("showOnlyUserRequests") == "true" || showOnlyUserRequests
        ? 0
        : 1;
    const search = params.get(SearchParam.Search);
    const dateStart = args.dateStart || params.get(SearchParam.StartDate);
    const dateEnd = args.dateEnd || params.get(SearchParam.EndDate);
    const fromDateStart = dateStart
      ? formatDate(dateStart, "YYYY-MM-DD")
      : null;
    const toDateEnd = dateEnd ? formatDate(dateEnd, "YYYY-MM-DD") : null;
    const { data } = await privateClient.get<
      HalPaginatedResponse<IRequestsResponse>
    >(`/users/${args.userId}/activities/requests/overview`, {
      params: {
        page: page ? parseInt(page) : undefined,
        limit,
        sortingDir: direction,
        sort: field,
        types: types,
        statuses: statuses,
        showSubordinatesByLevel: showSubordinatesByLevel,
        fullName: search,
        fromDateStart,
        toDateEnd,
        forceShowDataForWorkspaceUserInParams:
          args.forceShowDataForWorkspaceUserInParams,
      },
    });
    data._embedded.requests = correctActivityDates(
      data._embedded.requests
    ) as IActivity[];
    return data;
  }

  // static async getRequestById(loaderArgs: IActivityParams): Promise<IActivity> {
  //   const { workspaceId, userId, activityId } = loaderArgs;
  //   const { data } = await privateClient.get<IActivity>(
  //     `${WORKSPACE_URL}/${workspaceId}/workspace-users/${userId}/activities/requests/${activityId}`
  //   );
  //   return data;
  // }

  static async updateRequest(
    actionArgs: ClientActionFunctionArgs | IWorkspaceEmployeeParams,
    requestId: number,
    request: IRequestUpdateRequest
  ): Promise<IActivity> {
    const { employeeId } =
      "params" in actionArgs ? actionArgs.params : actionArgs;
    const { data } = await privateClient.post<IActivity>(
      `/users/${employeeId}/activities/review/${requestId}`,
      request
    );
    return data;
  }
}
