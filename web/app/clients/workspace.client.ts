import { WORKSPACE_URL } from "~/constants";
import {
  IWorkspace,
  IWorkspaceOverview,
  IWorkspaceUserCreateRes,
  IWorkspaceUserCreateReq,
  IWorkspacePatchReq,
  IWorkspaceExportReq,
  IWorkspaceCreateReq,
} from "~/types";
import { privateClient } from "~/util/api";
import { menuItemsList } from "~/util";
import parsePhoneNum from "libphonenumber-js";

export class WorkspaceClient {
  static async getWorkspaceOverview(): Promise<IWorkspaceOverview[]> {
    const { data } = await privateClient.get<IWorkspaceOverview[]>(
      `${WORKSPACE_URL}/overview`
    );
    return data;
  }

  static async getWorkspaceById(id: number): Promise<IWorkspace> {
    const { data } = await privateClient.get<IWorkspace>(
      `${WORKSPACE_URL}/${id}`
    );

    data.menuItems = menuItemsList.map((item) => item.id!);
    data.countryPhoneCode = parsePhoneNum(data.phone ?? "")?.countryCallingCode;
    data.fullPhone = data.phone;
    data.phone = parsePhoneNum(data.phone ?? "")?.nationalNumber;

    return data;
  }

  static async createWorkspace(
    workspaceCreateReq: IWorkspaceCreateReq
  ): Promise<IWorkspace> {
    const { data } = await privateClient.post<IWorkspace>(
      `${WORKSPACE_URL}`,
      workspaceCreateReq
    );
    return data;
  }

  static async createWorkspaceUser(
    createWorkspaceUserReq: IWorkspaceUserCreateReq,
    workspaceId: number
  ): Promise<IWorkspaceUserCreateRes> {
    const { data } = await privateClient.patch<IWorkspaceUserCreateRes>(
      `${WORKSPACE_URL}/${workspaceId}/workspace-users/join-workspace`,
      createWorkspaceUserReq
    );
    return data;
  }

  static async updateWorkspace(
    id: number,
    workspaceUpdateReq: IWorkspacePatchReq
  ) {
    const { data } = await privateClient.patch<IWorkspace>(
      `${WORKSPACE_URL}/${id}`,
      workspaceUpdateReq
    );

    return data;
  }

  // No data is returned by exports, BE holds the request until export is generated
  static async exportDaily(
    id: number,
    workspaceExportReq: IWorkspaceExportReq
  ) {
    await privateClient.post(
      `${WORKSPACE_URL}/${id}/workspace-exports/daily`,
      workspaceExportReq
    );
  }

  static async exportMonthly(
    id: number,
    workspaceExportReq: IWorkspaceExportReq
  ) {
    await privateClient.post(
      `${WORKSPACE_URL}/${id}/workspace-exports/monthly`,
      workspaceExportReq
    );
  }

  static async downloadDailyAndMonthly(
    id: number,
    workspaceExportReq: IWorkspaceExportReq
  ): Promise<{ daily: ArrayBuffer; monthly: ArrayBuffer }> {
    const [dailyRes, monthlyRes] = await Promise.all([
      privateClient.post(
        `${WORKSPACE_URL}/${id}/workspace-exports/daily-download`,
        workspaceExportReq,
        {
          responseType: "arraybuffer",
          headers: { Accept: "text/csv" },
        }
      ),
      privateClient.post(
        `${WORKSPACE_URL}/${id}/workspace-exports/monthly-download`,
        workspaceExportReq,
        {
          responseType: "arraybuffer",
          headers: { Accept: "text/csv" },
        }
      ),
    ]);

    return {
      daily: dailyRes.data,
      monthly: monthlyRes.data,
    };
  }
}
