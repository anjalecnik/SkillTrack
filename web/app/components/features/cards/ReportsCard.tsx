import { Divider } from "@mui/material";
import { t } from "i18next";
import { MainCard, FlexColumn, ComponentLoader } from "~/components/common";
import { CardLayout } from "~/components/layout";
import { useTablet } from "~/hooks";
import {
  IProject,
  IReport,
  IWorkspace,
  IWorkspaceReportRequest,
  IWorkspaceUser,
  IWorkspaceUserResponse,
  Status,
} from "~/types";
import { ReportForm, ReportInfo } from "~/components/features";
import { SubmissionResult } from "@conform-to/react";
import { useCallback, useEffect, useState } from "react";
import { ReportFormSchema } from "~/schemas";
import { WorkspaceReportClient } from "~/clients";
import { handleAxiosError } from "~/util";
import { ExportDialog } from "../dialogs/export-dialog";
import { useParams, useSearchParams } from "@remix-run/react";
import { downloadCSV } from "~/util/download-csv";

interface ReportsCardProps {
  lastResult?: SubmissionResult<string[]> | null;
  projects: IProject[];
  workspaceUsers: IWorkspaceUserResponse[];
  workspace: IWorkspace;
}

export function ReportsCard({
  lastResult,
  projects,
  workspaceUsers,
  workspace,
}: ReportsCardProps) {
  const isTablet = useTablet();
  const params = useParams();

  const [searchParams] = useSearchParams();
  const [report, setReport] = useState<IReport | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  const [reportFilters, setReportFilters] = useState({
    employeeIds: searchParams.get("employeeIds")
      ? searchParams.get("employeeIds")!.split(",").map(Number)
      : [],
    projectIds: searchParams.get("projectIds")
      ? searchParams.get("projectIds")!.split(",").map(Number)
      : [],
    dateStart: undefined as string | undefined,
    dateEnd: undefined as string | undefined,
  });

  if (!workspace) {
    throw new Error(t("error.somethingWentWrong") as string);
  }

  const exportReport = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await WorkspaceReportClient.exportReport(
        Number(params.workspaceId),
        {
          workspaceUserIds: reportFilters.employeeIds.map(String),
          projectIds: reportFilters.projectIds.map(String),
          fromDateStart: reportFilters.dateStart,
          toDateEnd: reportFilters.dateEnd,
        }
      );

      downloadCSV(response, "WorkProjectOverview.csv");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [reportFilters]);

  useEffect(() => {
    if (lastResult?.status === Status.Error) return;
    setReport(undefined);
    setIsLoading(false);

    const getReport = async () => {
      setIsLoading(true);
      try {
        const {
          workspaceId,
          employeeIds,
          projectIds,
          fromDateStart,
          toDateEnd,
        } = lastResult?.initialValue as ReportFormSchema;
        if (!workspaceId) return;

        const reportRequest: IWorkspaceReportRequest = {
          workspaceUserIds:
            employeeIds &&
            JSON.parse(employeeIds).map((user: IWorkspaceUser) =>
              user.id.toString()
            ),
          projectIds:
            projectIds &&
            JSON.parse(projectIds).map((project: IProject) =>
              project.id.toString()
            ),
          fromDateStart,
          toDateEnd,
        };

        const reportData = await WorkspaceReportClient.getWorkspaceReport(
          workspaceId,
          reportRequest
        );

        setReport(reportData);
      } catch (error) {
        handleAxiosError(error);
      }
      setIsLoading(false);
    };

    getReport();
  }, [lastResult]);

  return (
    <CardLayout>
      <FlexColumn gap="20px">
        <MainCard
          title={t("workspaceReports.title")}
          sx={{ width: isTablet ? "100%" : "50%" }}
          content={false}
        >
          <ComponentLoader isLoading={isLoading}>
            <ReportForm
              lastResult={lastResult}
              workspace={workspace}
              employees={workspaceUsers}
              projects={projects}
              reportFilters={reportFilters}
              setReportFilters={setReportFilters}
            />
          </ComponentLoader>
          <Divider />
          {lastResult?.status === Status.Success && report && (
            <ReportInfo
              report={report}
              setIsExportDialogOpen={setIsExportDialogOpen}
              onExport={exportReport}
            />
          )}

          <ExportDialog
            title="Export"
            open={isExportDialogOpen}
            error={error}
            downloadOptions={{
              isLoading: isLoading,
              isExportSuccess: !isLoading,
              exportSuccessMessage: "workspaceReports.exportSuccessMessage",
            }}
            onClose={() => setIsExportDialogOpen(false)}
          />
        </MainCard>
      </FlexColumn>
    </CardLayout>
  );
}
