import { Flex, DateInput, TextInput, Autocomplete } from "~/components/common";
import { IProjectUserResponse } from "~/types";
import {
  FormId,
  getInputProps,
  getSelectProps,
  useFormMetadata,
} from "@conform-to/react";
import { t } from "i18next";
import {
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface IBusinessTripDialogFormProps {
  projects: IProjectUserResponse[];
  formId: FormId;
  isEditing?: boolean;
  minReportingDate?: Dayjs;
}

export function BusinessTripDialogForm({
  projects,
  formId,
  isEditing,
  minReportingDate,
}: IBusinessTripDialogFormProps) {
  const theme = useTheme();
  const form = useFormMetadata(formId);
  const fields = form.getFieldset();
  const [isDriving, setIsDriving] = useState(!!fields.distanceInKM.value);
  const handleDrivingWithOwnCar = (
    e: React.SyntheticEvent,
    checked: boolean
  ) => {
    setIsDriving(checked);
  };

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
          disabled={isEditing}
          getOptionLabel={(option) => option?.name ?? ""}
          containerProps={{ sx: { flex: 1 } }}
        />
      </Flex>
      <Flex justifyContent="space-between" gap="20px">
        <DateInput
          label={t("userHub.departureDate")}
          name="dateStart"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          value={
            fields.dateStart.value
              ? dayjs(fields.dateStart.value as string, "DD.MM.YYYY", true)
              : undefined
          }
          minDate={minReportingDate}
          required
        />
        <DateInput
          label={t("userHub.returnDate")}
          name="dateEnd"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          value={
            fields.dateEnd.value
              ? dayjs(fields.dateEnd.value as string, "DD.MM.YYYY")
              : null
          }
          minDate={minReportingDate}
          required
        />
      </Flex>

      <Flex justifyContent="space-between" gap="20px">
        <TextInput
          label={t("userHub.destination")}
          containerProps={{ sx: { flex: 1 } }}
          {...getInputProps(fields.location, { type: "text" })}
          key={fields.location.key}
          required
        />
      </Flex>
      <Flex>
        <FormControlLabel
          control={<Checkbox checked={isDriving} />}
          label={t("userHub.iWasDriving")}
          labelPlacement="end"
          onChange={handleDrivingWithOwnCar}
          sx={{ ml: "1px" }}
        />
      </Flex>
      {isDriving && (
        <TextInput
          label={t("userHub.mileage")}
          containerProps={{ sx: { flex: 1 } }}
          {...getInputProps(fields.distanceInKM, { type: "number" })}
          key={fields.distanceInKM.key}
          error={!!fields.distanceInKM.errors}
          errorMessage={t(fields.distanceInKM.errors?.[0] ?? "")}
          required
        />
      )}
      <Flex justifyContent="space-between" gap="20px">
        <TextInput
          label={t("userHub.description")}
          containerProps={{ sx: { flex: 1 } }}
          {...getInputProps(fields.description, { type: "text" })}
          key={fields.description.key}
          multiline
          rows={2}
        />
      </Flex>
      <Typography
        sx={{
          color: theme.palette.customColors.red.main,
        }}
      >
        {t(fields.dateEnd.errors?.[0] ?? "")}
      </Typography>
    </>
  );
}
