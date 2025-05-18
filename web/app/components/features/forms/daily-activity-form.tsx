import { DeleteOutlined } from "@ant-design/icons";
import { FormId, getSelectProps, useFormMetadata } from "@conform-to/react";
import { IconButton, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AddItemButton,
  Autocomplete,
  Flex,
  FlexColumn,
  TimeSelect,
} from "~/components/common";
import { DataTestIds } from "~/data-test-ids";
import { DailyActivitySubmissionType } from "~/schemas";
import { IProjectUserResponse } from "~/types";

export interface IDailyActivityFormProps {
  formId: FormId<DailyActivitySubmissionType, string[]>;
  projects: IProjectUserResponse[];
  isLoading: boolean;
}

export function DailyActivityForm({
  formId,
  projects,
}: IDailyActivityFormProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const form = useFormMetadata(formId);

  const fields = form.getFieldset();
  const workingTimes = fields.workingTime.getFieldList();

  return (
    <FlexColumn gap="20px" marginTop="20px">
      <FlexColumn gap="20px">
        {workingTimes.map((workingTime, index) => {
          const workingTimeFields = workingTime.getFieldset();
          const timeRange = workingTimeFields.timeRange.getFieldset();

          return (
            <FlexColumn key={workingTime.key} gap="20px">
              <Flex gap="10px" alignItems={"end"}>
                <Autocomplete
                  {...getSelectProps(workingTimeFields.projectId)}
                  data-testid={`${DataTestIds.dailyReport.projectDropdown}-${index}`}
                  name={workingTimeFields.projectId.name}
                  required
                  label={t("dailyReport.project")}
                  containerProps={{ sx: { flex: 1 } }}
                  options={projects}
                  value={
                    projects.find(
                      (p) => p.id === Number(workingTimeFields.projectId?.value)
                    ) || null
                  }
                  getOptionLabel={(option) => option?.name ?? ""}
                  error={!!workingTimeFields.projectId.errors}
                  errorMessage={t(
                    workingTimeFields.projectId.errors?.[0] ?? ""
                  )}
                />
                {workingTimes.length > 1 && (
                  <IconButton
                    {...form.remove.getButtonProps({
                      name: fields.workingTime.name,
                      index: index,
                    })}
                    data-testid={`${DataTestIds.dailyReport.deleteBtn}-${index}`}
                    size="large"
                    color="default"
                    type="submit"
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Flex>
              <Flex gap="10px">
                <TimeSelect
                  label={t("dailyReport.start")}
                  name={timeRange.fromTimeStart.name}
                  defaultValue={timeRange.fromTimeStart.initialValue}
                  containerProps={{ sx: { flex: 1 } }}
                  required
                  error={!!timeRange.fromTimeStart.errors}
                  errorMessage={
                    t(timeRange.fromTimeStart.errors?.[0] ?? "") ?? undefined
                  }
                  dataTestId={`${DataTestIds.dailyReport.dailyReportStartTimeInput}-${index}`}
                />
                <TimeSelect
                  label={t("dailyReport.end")}
                  name={timeRange.toTimeEnd.name}
                  defaultValue={timeRange.toTimeEnd.initialValue}
                  containerProps={{ sx: { flex: 1 } }}
                  error={!!timeRange.toTimeEnd.errors}
                  errorMessage={
                    t(timeRange.toTimeEnd.errors?.[0] ?? "") ?? undefined
                  }
                  dataTestId={`${DataTestIds.dailyReport.dailyReportEndTimeInput}-${index}`}
                  required
                />
              </Flex>
            </FlexColumn>
          );
        })}
        {fields.workingTime.errors && (
          <Typography
            sx={{
              color: theme.palette.customColors.red.main,
            }}
          >
            {t(fields.workingTime.errors[0])}
          </Typography>
        )}
      </FlexColumn>
      <AddItemButton
        data-testid={DataTestIds.dailyReport.addProjectBtn}
        onClick={() =>
          form.insert({
            name: fields.workingTime.name,
            defaultValue: { projectId: null },
          })
        }
        type="button"
        form={form.name}
        sx={{
          width: "fit-content",
          alignSelf: "end",
          minWidth: "130px",
        }}
      >
        {t("dailyReport.addProject")}
      </AddItemButton>
    </FlexColumn>
  );
}
