import dayjs, { Dayjs } from "dayjs";
import { t } from "i18next";
import { useSearchParams } from "@remix-run/react";
import { Divider, Typography, Box, Chip } from "@mui/material";
import {
  SelectWithChips,
  Button,
  DateInput,
  Flex,
  FlexColumn,
} from "~/components/common";
import { FormId, useFormMetadata } from "@conform-to/react";
import { IProject, IUserResponse } from "~/types";
import { ReportFormSchema } from "~/schemas";
import { Dispatch, SetStateAction } from "react";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";

export interface IReportFormProps {
  formId: FormId;
  employees: IUserResponse[];
  projects: IProject[];
  reportFilters: {
    employeeIds: number[];
    projectIds: number[];
    controlledFromDateStart: Dayjs | null;
    controlledToDateEnd: Dayjs | null;
  };
  setReportFilters: Dispatch<
    SetStateAction<{
      employeeIds: number[];
      projectIds: number[];
      controlledFromDateStart: Dayjs | null;
      controlledToDateEnd: Dayjs | null;
    }>
  >;
}
export function ReportForm({
  formId,
  employees,
  projects,
  reportFilters,
  setReportFilters,
}: IReportFormProps) {
  const form = useFormMetadata<ReportFormSchema>(formId);
  const fields = form.getFieldset();

  const [searchParams, setSearchParams] = useSearchParams();

  const transformToParmaIds = (array: IUserResponse[] | IProject[]): string => {
    return array.map((e) => e.id).toString();
  };

  const handleOnSelectedChange = (
    value: IUserResponse[] | IProject[],
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

  const nothingSelected =
    !reportFilters.employeeIds.length && !reportFilters.projectIds.length;

  return (
    <>
      <FlexColumn padding="20px">
        <FlexColumn gap="20px" paddingX="20px">
          <SelectWithChips
            name={fields.employeeIds.name}
            defaultValue={employees.filter((emp) =>
              reportFilters.employeeIds.includes(emp.id)
            )}
            options={employees}
            multiple={true}
            label={t("common.employees")}
            placeholder={t("workspaceReports.selectEmployees")}
            avatarImage={(option) => option.name ?? ""}
            labelExtractor={(option) => `${option.name} ${option.surname}`}
            valueExtractor={(option) => option.id}
            onChange={(value) => {
              handleOnSelectedChange(value, "employeeIds");
              setReportFilters({
                ...reportFilters,
                employeeIds: value.map((e) => e.id),
              });
            }}
          />
          <Box>
            <SelectWithChips
              name={fields.projectIds.name}
              defaultValue={projects.filter((proj) =>
                reportFilters.projectIds.includes(proj.id)
              )}
              options={projects}
              multiple={true}
              label={t("common.projects")}
              placeholder={t("workspaceReports.selectProjects")}
              avatarImage={(option) => option.name ?? ""}
              labelExtractor={(option) => `${option.name}`}
              valueExtractor={(option) => option.id}
              onChange={(value) => {
                handleOnSelectedChange(value, "projectIds");
                setReportFilters({
                  ...reportFilters,
                  projectIds: value.map((e) => e.id),
                });
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
          <input
            type="hidden"
            name={fields.fromDateStart.name}
            value={reportFilters.controlledFromDateStart?.format(
              DEFAULT_PROJECT_DATE_FORMAT
            )}
          />
          <DateInput
            name="controlledFromDateStart"
            value={reportFilters.controlledFromDateStart}
            onChange={(date) =>
              setReportFilters({
                ...reportFilters,
                controlledFromDateStart: date,
              })
            }
            label={t("common.from")}
            format={DEFAULT_PROJECT_DATE_FORMAT}
          />

          <input
            type="hidden"
            name={fields.toDateEnd.name}
            value={reportFilters.controlledToDateEnd?.format(
              DEFAULT_PROJECT_DATE_FORMAT
            )}
          />
          <DateInput
            name="controlledToDateEnd"
            value={reportFilters.controlledToDateEnd}
            onChange={(date) =>
              setReportFilters({
                ...reportFilters,
                controlledToDateEnd: date,
              })
            }
            label={t("common.to")}
            format={DEFAULT_PROJECT_DATE_FORMAT}
          />
        </Flex>
        <Flex gap="8px" paddingX="20px">
          <Chip
            label={t("common.thisMonth")}
            onClick={() =>
              setReportFilters({
                ...reportFilters,
                controlledFromDateStart: dayjs().startOf("month"),
                controlledToDateEnd: dayjs().endOf("month"),
              })
            }
          />

          <Chip
            label={t("common.previousMonth")}
            onClick={() =>
              setReportFilters({
                ...reportFilters,
                controlledFromDateStart: dayjs()
                  .subtract(1, "month")
                  .startOf("month"),
                controlledToDateEnd: dayjs()
                  .subtract(1, "month")
                  .endOf("month"),
              })
            }
          />

          <Chip
            label={t("workspaceReports.yearly")}
            onClick={() =>
              setReportFilters({
                ...reportFilters,
                controlledFromDateStart: dayjs().startOf("year"),
                controlledToDateEnd: dayjs().endOf("year"),
              })
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
          type="submit"
          variant="contained"
          name="intent"
          value="generate"
          disabled={nothingSelected}
        >
          {t("workspaceReports.generate")}
        </Button>
      </Flex>
    </>
  );
}
