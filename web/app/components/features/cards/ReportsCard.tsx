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
  IUserResponse,
  SearchParam,
  Status,
} from "~/types";
import { ReportForm, ReportInfo } from "~/components/features";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { useEffect, useState } from "react";
import { ReportFormSchema, reportFormSchema as schema } from "~/schemas";
import { UserClient } from "~/clients";
import { handleAxiosError } from "~/util";
import { Form, useParams, useSearchParams } from "@remix-run/react";
import { parseWithZod } from "@conform-to/zod";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";
import dayjs, { Dayjs } from "dayjs";

interface ReportsCardProps {
  lastResult?: SubmissionResult<string[]> | null;
  projects: IProject[];
  users: IUserResponse[];
  workspace: IWorkspace;
}

export function ReportsCard({ lastResult, projects, users }: ReportsCardProps) {
  const isTablet = useTablet();

  const [searchParams] = useSearchParams();
  const [report, setReport] = useState<IReport | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      intent: "generate",
      employeeIds: searchParams.get(SearchParam.EmployeeIds) || "",
      projectIds: searchParams.get(SearchParam.ProjectIds) || "",
      fromDateStart: dayjs()
        .startOf("month")
        .format(DEFAULT_PROJECT_DATE_FORMAT),
      toDateEnd: dayjs().endOf("month").format(DEFAULT_PROJECT_DATE_FORMAT),
    },
    shouldValidate: "onSubmit",
    id: `reports-form`,
  });

  const [reportFilters, setReportFilters] = useState<{
    employeeIds: number[];
    projectIds: number[];
    controlledFromDateStart: Dayjs | null;
    controlledToDateEnd: Dayjs | null;
  }>({
    employeeIds: fields.employeeIds.initialValue?.split(",")?.map(Number) || [],
    projectIds: fields.projectIds.initialValue?.split(",")?.map(Number) || [],
    controlledFromDateStart: dayjs(
      fields.fromDateStart.initialValue,
      DEFAULT_PROJECT_DATE_FORMAT
    ),
    controlledToDateEnd: dayjs(
      fields.toDateEnd.initialValue,
      DEFAULT_PROJECT_DATE_FORMAT
    ),
  });

  useEffect(() => {
    if (lastResult?.status === Status.Error) return;
    setReport(undefined);
    setIsLoading(false);

    const getReport = async () => {
      setIsLoading(true);
      try {
        const { employeeIds, projectIds, fromDateStart, toDateEnd } =
          lastResult?.initialValue as ReportFormSchema;

        const reportRequest: IWorkspaceReportRequest = {
          userIds:
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

        const reportData = await UserClient.getReport(reportRequest);

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
            <Form method="post" id={form.id}>
              <FormProvider context={form.context}>
                <ReportForm
                  formId={form.id}
                  employees={users}
                  projects={projects}
                  reportFilters={reportFilters}
                  setReportFilters={setReportFilters}
                />
              </FormProvider>
            </Form>
          </ComponentLoader>
          <Divider />
          {lastResult?.status === Status.Success && report && (
            <ReportInfo report={report} />
          )}
        </MainCard>
      </FlexColumn>
    </CardLayout>
  );
}
