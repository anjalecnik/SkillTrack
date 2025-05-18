import { t } from "i18next";
import {
  Flex,
  FlexColumn,
  TextInput,
  DateInput,
  Autocomplete,
  UploadButton,
} from "~/components/common";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { IProjectUserResponse } from "~/types";
import dayjs, { Dayjs } from "dayjs";

interface IExpensesDialogFormProps {
  projects: IProjectUserResponse[];
  formId: FormId;
  minReportingDate?: Dayjs;
}

export function ExpensesDialogForm({
  projects,
  formId,
  minReportingDate,
}: IExpensesDialogFormProps) {
  const form = useFormMetadata(formId);
  const fields = form.getFieldset();

  return (
    <>
      <Flex justifyContent="space-between" gap="50px">
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
        <TextInput
          dataTestId="valueInput"
          label={t("userHub.value")}
          containerProps={{ sx: { flex: 1 } }}
          {...getInputProps(fields.valueInEuro, { type: "number" })}
          value={fields.valueInEuro.value ?? ""}
          key={fields.valueInEuro.key}
          inputProps={{ min: 0, step: 0.01 }}
          error={!!fields.valueInEuro?.errors}
          errorMessage={t(fields.valueInEuro.errors?.[0] ?? "")}
          required
        />
        <DateInput
          dataTestId="dateInput"
          label={t("userHub.date")}
          name="date"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          minDate={minReportingDate}
          value={
            fields.date.value
              ? dayjs(fields.date.value as string, "DD.MM.YYYY")
              : null
          }
          required
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
      <UploadButton
        label={t("userHub.attachment")!}
        text={t("userHub.chooseFile")}
        name={fields.file.name}
        required
        key={fields.file.key}
      />
      <FlexColumn gap="4px">
        {fields.file.errors?.map((error, index) => (
          <Typography
            key={index}
            variant="body2"
            sx={{
              color: "error.main",
            }}
          >
            {t(error)}
          </Typography>
        ))}
      </FlexColumn>

      <Flex
        alignItems="center"
        gap="8px"
        color={(theme) => theme.palette.secondary.main}
      >
        <FormControlLabel
          {...getInputProps(fields.isPaidWithCompanyCard, {
            type: "checkbox",
          })}
          key={fields.isPaidWithCompanyCard.key}
          control={<Checkbox />}
          label={t("userHub.paidWithCompanyCard")}
          labelPlacement="end"
          sx={{ ml: "1px" }}
        />
      </Flex>
    </>
  );
}
