import {
  Flex,
  DateInput,
  TextInput,
  TimeSelect,
  Autocomplete,
} from "~/components/common";
import { IProjectUserResponse } from "~/types";
import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { t } from "i18next";
import { Typography, useTheme } from "@mui/material";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Trans } from "react-i18next";
import dayjs, { Dayjs } from "dayjs";
import { DataTestIds } from "~/data-test-ids";

interface IOnCallDialogFormProps {
  projects: IProjectUserResponse[];
  formId: FormId;
  minReportingDate?: Dayjs;
}

export function OnCallDialogForm({
  projects,
  formId,
  minReportingDate,
}: IOnCallDialogFormProps) {
  const theme = useTheme();
  const form = useFormMetadata(formId);
  const fields = form.getFieldset();

  return (
    <>
      <Flex justifyContent="space-between">
        <Autocomplete
          {...getSelectProps(fields.projectId)}
          key={projects[0]?.id}
          name={fields.projectId.name}
          label={t("userHub.project")}
          value={projects[0]}
          required
          options={projects}
          getOptionLabel={(option) => option?.name ?? ""}
          containerProps={{ sx: { flex: 1 } }}
        />
      </Flex>
      <Flex justifyContent="space-between" gap="20px">
        <DateInput
          label={t("userHub.startDate")}
          name="dateStart"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          minDate={minReportingDate}
          value={
            fields.dateStart.value
              ? dayjs(fields.dateStart.value as string, "DD.MM.YYYY")
              : undefined
          }
          required
          dataTestId={DataTestIds.moreToReport.onCall.startDateInput}
        />
        <TimeSelect
          label={t("userHub.startTime")}
          name="startTime"
          containerProps={{ sx: { flex: 1 } }}
          defaultValue={fields.startTime.initialValue}
          required
          dataTestId={DataTestIds.moreToReport.onCall.startTimeInput}
        />
      </Flex>
      <Flex justifyContent="space-between" gap="20px">
        <DateInput
          label={t("userHub.endDate")}
          name="dateEnd"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          minDate={minReportingDate}
          required
          dataTestId={DataTestIds.moreToReport.onCall.endDateInput}
        />
        <TimeSelect
          label={t("userHub.endTime")}
          containerProps={{ sx: { flex: 1 } }}
          name="endTime"
          required
          errorMessage={t(fields.endTime?.errors?.[0] ?? "")}
          dataTestId={DataTestIds.moreToReport.onCall.endTimeInput}
        />
      </Flex>
      <Typography
        sx={{
          color: theme.palette.customColors.red.main,
        }}
      >
        {t(fields.dateEnd.errors?.[0] ?? "")}
      </Typography>
      <Flex justifyContent="space-between">
        <TextInput
          label={t("userHub.description")}
          containerProps={{ sx: { flex: 1 } }}
          {...getInputProps(fields.description, { type: "text" })}
          key={fields.description.key}
          multiline
          rows={2}
        />
      </Flex>
      <Flex alignItems="center" gap="10px">
        <InfoCircleOutlined
          style={{
            color: theme.palette.primary.main,
          }}
        />
        <Typography variant="body1">
          <Trans i18nKey="userHub.activityNotificationEmail" t={t} />
        </Typography>
      </Flex>
    </>
  );
}
