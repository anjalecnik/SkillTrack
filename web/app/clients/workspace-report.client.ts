import { WORKSPACE_URL } from "~/constants";
import { IWorkspaceReportRequest, IWorkspaceReportResponse } from "~/types";
import { IWorkspaceReportExportRequest } from "~/types/interfaces/workspace/requests/workspace-report-export.request";
import { privateClient } from "~/util";

export class WorkspaceReportClient {
  static async getWorkspaceReport(
    workspaceId: number,
    reportReq: IWorkspaceReportRequest
  ): Promise<IWorkspaceReportResponse> {
    const { data } = await privateClient.get<IWorkspaceReportResponse>(
      `${WORKSPACE_URL}/${workspaceId}/work-overviews`,
      {
        params: reportReq,
      }
    );
    return data;
  }

  static async exportReport(
    workspaceId: number,
    workspaceReportExportReq: IWorkspaceReportExportRequest
  ) {
    const { data } = await privateClient.post(
      `${WORKSPACE_URL}/${workspaceId}/work-overviews/report`,
      workspaceReportExportReq,
      {
        responseType: "arraybuffer",
        headers: {
          Accept: "text/csv",
        },
      }
    );
    return data;
  }
}
