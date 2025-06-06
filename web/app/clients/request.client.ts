import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import {
  IGetActivitiesRequest,
  IRequestsResponse,
  ActivityStatus,
  IEmployeeParams,
  IRequestUpdateRequest,
  IActivity,
  ActivityType,
  HalPaginatedResponse,
  SearchParam,
} from "~/types";
import { correctActivityDates, formatDate, privateClient } from "~/util";

export class RequestClient {
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
        forceShowDataForUserInParams: args.forceShowDataForUserInParams,
      },
    });
    data._embedded.requests = correctActivityDates(
      data._embedded.requests
    ) as IActivity[];
    return data;
  }

  static async updateRequest(
    actionArgs: ClientActionFunctionArgs | IEmployeeParams,
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
