import { t } from "i18next";
import {
  Flex,
  DateInput,
  TextInput,
  Autocomplete,
  TimeSelect,
} from "~/components/common";
import { Typography, useTheme } from "@mui/material";
import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { Trans } from "react-i18next";
import { IProjectUserResponse } from "~/types";
import dayjs, { Dayjs } from "dayjs";

interface IOvertimeDialogFormProps {
  projects: IProjectUserResponse[];
  formId: FormId;
  minReportingDate?: Dayjs;
}

export function OvertimeDialogForm({
  projects,
  formId,
  minReportingDate,
}: IOvertimeDialogFormProps) {
  const form = useFormMetadata(formId);
  const fields = form.getFieldset();
  const theme = useTheme();

  return (
    <>
      <Flex justifyContent="space-between" gap="20px">
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
      <DateInput
        label={t("userHub.date")}
        name="date"
        containerProps={{ sx: { flex: 1 } }}
        format="DD.MM.YYYY"
        minDate={minReportingDate}
        value={
          fields.date.value
            ? dayjs(fields.date.value as string, "DD.MM.YYYY")
            : undefined
        }
        required
        dataTestId="overtimeFormDateInput"
      />
      <Flex justifyContent="space-between" gap="20px">
        <TimeSelect
          label={t("userHub.startTime")}
          containerProps={{ sx: { flex: 1 } }}
          name="startTime"
          defaultValue={fields.startTime.initialValue}
          dataTestId="overtimeFormStartTimeInput"
          required
        />
        <TimeSelect
          label={t("userHub.endTime")}
          containerProps={{ sx: { flex: 1 } }}
          name="endTime"
          defaultValue={fields.endTime.initialValue}
          dataTestId="overtimeFormEndTimeInput"
          required
          errorMessage={t(fields.endTime.errors?.[0] ?? "")}
        />
      </Flex>
      <Flex>
        <TextInput
          label={t("userHub.explanation")}
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
