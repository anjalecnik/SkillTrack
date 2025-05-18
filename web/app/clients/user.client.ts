// import {
//   ClientActionFunctionArgs,
//   ClientLoaderFunctionArgs,
// } from "@remix-run/react";
// import { t } from "i18next";
import parsePhoneNum from "libphonenumber-js";
// import { API_URL } from "~/constants";
// import {
//   PaginatedResponse,
//   IWorkspaceUserResponse,
//   IWorkspaceUserInviteReq,
//   IWorkspaceUserInviteRes,
//   IWorkspaceUser,
//   IWorkspaceUserUpdateReq,
//   IWorkspaceEmployeeParams,
//   EmployeeAddressType,
//   SortBy,
//   SortDirection,
//   SearchParam,
//   IWorkspaceUserIsSupervisorResponse,
// } from "~/types";
// import { privateClient } from "~/util/api";

import {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "@remix-run/react";
import {
  IEmployeeParams,
  PaginatedResponse,
  SearchParam,
  SortBy,
  SortDirection,
  IUserResponse,
  IWorkspaceUser,
  IWorkspaceUserInviteReq,
  IWorkspaceUserInviteRes,
  IWorkspaceUserUpdateReq,
} from "~/types";
import { privateClient } from "~/util";

export class UserClient {
  static async getUsers(
    loaderArgs: ClientLoaderFunctionArgs,
    limit: number = 0
  ): Promise<PaginatedResponse<IUserResponse>> {
    const params = new URLSearchParams(loaderArgs.request.url.split("?")[1]);

    const query = params.get(SearchParam.Sort);

    let [field, direction] = query?.split(":") ?? [];

    if (!field && !direction) {
      field = SortBy.name;
      direction = SortDirection.Asc;
    }

    const statuses = params.get("status")
      ? params.get("status")!.split(",")
      : ["Active"];
    const search = params.get("search");
    const page = params.get("page");

    const { data } = await privateClient.get<PaginatedResponse<IUserResponse>>(
      `/users`,
      {
        params: {
          sortingDir: direction,
          sort: field,
          statuses,
          fullName: search,
          page: page ? parseInt(page) : undefined,
          limit,
        },
      }
    );

    return data;
  }

  static async inviteUser(user: IWorkspaceUserInviteReq) {
    const { data } = await privateClient.post<IWorkspaceUserInviteRes>(
      `/users/invite`,
      user
    );

    return data;
  }

  static async getUserById(
    loaderArgs: ClientLoaderFunctionArgs | IEmployeeParams
  ): Promise<IWorkspaceUser> {
    const { employeeId } =
      "params" in loaderArgs ? loaderArgs.params : loaderArgs;

    const { data } = await privateClient.get<IUserResponse>(
      `/users/${employeeId}`
    );

    // const vacationDays =
    //   data.assignedVacations.length > 0
    //     ? `${data.activityStatistic.vacation.total.usedDays ?? 0} / ${
    //         data.activityStatistic.vacation.total.assignedDays
    //       } ${t("common.days")}`
    //     : t("error.notPresent");

    const phoneNumber = parsePhoneNum(data.phone ?? "");

    const parsedData: IWorkspaceUser = {
      ...data,
      fullPhone: data.phone,
      countryPhoneCode: phoneNumber?.countryCallingCode,
      phone: phoneNumber?.nationalNumber,
      vacationDays: [],
    };
    return parsedData;
  }

  //   static async getWorkspaceUserIsSupervisor(
  //     loaderArgs: ClientLoaderFunctionArgs | IWorkspaceEmployeeParams
  //   ): Promise<IWorkspaceUserIsSupervisorResponse> {
  //     const { workspaceId, employeeId } =
  //       "params" in loaderArgs ? loaderArgs.params : loaderArgs;

  //     const { data } =
  //       await privateClient.get<IWorkspaceUserIsSupervisorResponse>(
  //         `${WORKSPACE_URL}/${workspaceId}/workspace-users/${employeeId}/requestor-is-supervisor`
  //       );

  //     return data;
  //   }

  static async updateUser(
    user: IWorkspaceUserUpdateReq,
    actionArgs?: ClientActionFunctionArgs,
    employeeId?: number
  ) {
    const { data } = await privateClient.patch<IUserResponse>(
      `/users/${actionArgs?.params.employeeId ?? employeeId}`,
      user
    );

    return data;
  }
}
