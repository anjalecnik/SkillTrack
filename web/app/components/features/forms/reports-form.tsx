import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { Form, useSearchParams } from "@remix-run/react";
import { parseWithZod } from "@conform-to/zod";
import { Divider, Typography, Box, Chip } from "@mui/material";
import {
  SelectWithChips,
  Button,
  DateInput,
  Flex,
  FlexColumn,
} from "~/components/common";
import { FormProvider, SubmissionResult, useForm } from "@conform-to/react";
import { IProject, IWorkspace, IWorkspaceUserResponse } from "~/types";
import { reportFormSchema as schema } from "~/schemas";
import { Dispatch, SetStateAction } from "react";
import { formatDate } from "~/util";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";
import { DataTestIds } from "~/data-test-ids";

export interface IReportFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  workspace: IWorkspace;
  employees: IWorkspaceUserResponse[];
  projects: IProject[];
  reportFilters: {
    employeeIds: number[];
    projectIds: number[];
    dateStart: string | undefined;
    dateEnd: string | undefined;
  };
  setReportFilters: Dispatch<
    SetStateAction<{
      employeeIds: number[];
      projectIds: number[];
      dateStart: string | undefined;
      dateEnd: string | undefined;
    }>
  >;
}
export function ReportForm({
  lastResult,
  workspace,
  employees,
  projects,
  reportFilters,
  setReportFilters,
}: IReportFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      intent: "generate",
      employeeIds: searchParams.get("employeeIds") || "",
      projectIds: searchParams.get("projectIds") || "",
    },
    shouldValidate: "onSubmit",
    id: `reports-form`,
  });

  const transformToParmaIds = (
    array: IWorkspaceUserResponse[] | IProject[]
  ): string => {
    return array.map((e) => e.id).toString();
  };

  const handleOnSelectedChange = (
    value: IWorkspaceUserResponse[] | IProject[],
    paramsName: string
  ) => {
    if (!value.length) {
      searchParams.delete(paramsName);
      setSearchParams(searchParams, { replace: true });
      return;
    }

    searchParams.set(paramsName, transformToParmaIds(value));
    setSearchParams(searchParams, { replace: true });
  };

  const handleFormatDate = (date: Dayjs | null): string | undefined => {
    return date
      ? formatDate(date, undefined, DEFAULT_PROJECT_DATE_FORMAT)
      : undefined;
  };

  const nothingSelected =
    !searchParams.get("employeeIds")?.length &&
    !searchParams.get("projectIds")?.length;

  return (
    <Form method="post" id={form.id}>
      <FormProvider context={form.context}>
        <FlexColumn padding="20px">
          <FlexColumn gap="20px" paddingX="20px">
            <SelectWithChips
              name={fields.employeeIds.name}
              defaultValue={employees.filter((emp) =>
                reportFilters.employeeIds.includes(emp.id)
              )}
              dataTestId={DataTestIds.reports.employeeIds}
              options={employees}
              multiple={true}
              label={t("common.employees")}
              placeholder={t("workspaceReports.selectEmployees")}
              avatarImage={(option) => option.name ?? ""}
              labelExtractor={(option) => `${option.name} ${option.surname}`}
              valueExtractor={(option) => option.id}
              onChange={(value) => {
                handleOnSelectedChange(value, "employeeIds");
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  employeeIds: value.map((e) => e.id),
                }));
              }}
            />
            <Box>
              <SelectWithChips
                name={fields.projectIds.name}
                defaultValue={projects.filter((proj) =>
                  reportFilters.projectIds.includes(proj.id)
                )}
                dataTestId={DataTestIds.reports.projectIds}
                options={projects}
                multiple={true}
                label={t("common.projects")}
                placeholder={t("workspaceReports.selectProjects")}
                avatarImage={(option) => option.name ?? ""}
                labelExtractor={(option) => `${option.name}`}
                valueExtractor={(option) => option.id}
                onChange={(value) => {
                  handleOnSelectedChange(value, "projectIds");
                  setReportFilters((prevFilters) => ({
                    ...prevFilters,
                    projectIds: value.map((e) => e.id),
                  }));
                }}
              />
              {fields.projectIds.errors && (
                <Typography color="red">
                  {t(fields.projectIds.errors[0])}
                </Typography>
              )}
            </Box>
          </FlexColumn>
          <Flex gap="20px" paddingX="20px">
            <DateInput
              name={fields.fromDateStart.name}
              value={
                reportFilters.dateStart
                  ? dayjs(reportFilters.dateStart, DEFAULT_PROJECT_DATE_FORMAT)
                  : null
              }
              onChange={(date) =>
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  dateStart: handleFormatDate(date),
                }))
              }
              label={t("common.from")}
              format={DEFAULT_PROJECT_DATE_FORMAT}
            />

            <DateInput
              name={fields.toDateEnd.name}
              value={
                reportFilters.dateEnd
                  ? dayjs(reportFilters.dateEnd, DEFAULT_PROJECT_DATE_FORMAT)
                  : null
              }
              onChange={(date) =>
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  dateEnd: handleFormatDate(date),
                }))
              }
              label={t("common.to")}
              format={DEFAULT_PROJECT_DATE_FORMAT}
            />
          </Flex>
          <Flex gap="8px" paddingX="20px">
            <Chip
              data-testid={DataTestIds.reports.thisMonthRange}
              label={t("common.thisMonth")}
              onClick={() =>
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  dateStart: handleFormatDate(dayjs().startOf("month")),
                  dateEnd: handleFormatDate(dayjs().endOf("month")),
                }))
              }
            />

            <Chip
              label={t("common.previousMonth")}
              onClick={() =>
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  dateStart: handleFormatDate(
                    dayjs().subtract(1, "month").startOf("month")
                  ),
                  dateEnd: handleFormatDate(
                    dayjs().subtract(1, "month").endOf("month")
                  ),
                }))
              }
            />

            <Chip
              label={t("workspaceReports.yearly")}
              onClick={() =>
                setReportFilters((prevFilters) => ({
                  ...prevFilters,
                  dateStart: handleFormatDate(dayjs().startOf("year")),
                  dateEnd: handleFormatDate(dayjs().endOf("year")),
                }))
              }
            />
          </Flex>

          {fields.toDateEnd.errors && (
            <Typography paddingX="20px" color="red">
              {t(fields.toDateEnd.errors[0])}
            </Typography>
          )}
        </FlexColumn>
        <Divider />
        <Flex justifyContent="end" gap="20px" padding="10px 16px">
          <Button
            data-testid={DataTestIds.reports.generateBtn}
            type="submit"
            variant="contained"
            name="intent"
            value="generate"
            disabled={nothingSelected}
          >
            {t("workspaceReports.generate")}
          </Button>
        </Flex>
      </FormProvider>
    </Form>
  );
}
