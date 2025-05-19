import {
  Flex,
  DateInput,
  TextInput,
  TimeSelect,
  Autocomplete,
} from "~/components/common";
import { EmployeeAddressType, IAddress, IProjectUserResponse } from "~/types";
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

interface ITripToOfficeDialogFormProps {
  projects: IProjectUserResponse[];
  formId: FormId;
  isEditing?: boolean;
  workspaceAddresses: IAddress[];
  userAddresses: IAddress[];
  minReportingDate?: Dayjs;
}

export function TripToOfficeDialogForm({
  projects,
  formId,
  isEditing,
  workspaceAddresses,
  userAddresses,
  minReportingDate,
}: ITripToOfficeDialogFormProps) {
  const theme = useTheme();
  const form = useFormMetadata(formId);
  const fields = form.getFieldset();

  const combineAddresses = (
    workspaceAddresses: IAddress[],
    userAddresses: IAddress[]
  ): { id: string }[] => [
    ...(workspaceAddresses ?? []).map((address) => ({
      id: `${address.streetAddress}, ${address.city}`,
    })),
    ...(userAddresses ?? [])
      .sort(({ type }) => (type === EmployeeAddressType.Temporary ? 1 : 0))
      .map((address) => ({ id: `${address.streetAddress}, ${address.city}` })),
  ];

  const addresses: { id: string }[] = combineAddresses(
    workspaceAddresses,
    userAddresses
  );

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
          minDate={minReportingDate}
          value={
            fields.dateStart.value
              ? dayjs(fields.dateStart.value as string, "DD.MM.YYYY")
              : null
          }
          required
        />
        <TimeSelect
          label={t("userHub.departureTime")}
          containerProps={{ sx: { flex: 1 } }}
          name="departureTime"
          defaultValue={fields.departureTime.initialValue}
          required
        />
      </Flex>
      <Flex justifyContent="space-between" gap="20px">
        <DateInput
          label={t("userHub.returnDate")}
          name="dateEnd"
          containerProps={{ sx: { flex: 1 } }}
          format="DD.MM.YYYY"
          minDate={minReportingDate}
          required
        />
        <TimeSelect
          label={t("userHub.returnTime")}
          containerProps={{ sx: { flex: 1 } }}
          name="returnTime"
          defaultValue={fields.returnTime.initialValue}
          required
          errorMessage={t(fields.returnTime.errors?.[0] ?? "")}
        />
      </Flex>
      <Flex justifyContent="space-between" gap="20px">
        <Autocomplete
          {...getSelectProps(fields.locationFrom)}
          value={
            addresses[addresses.length - 1]
              ? { id: addresses[addresses.length - 1]?.id }
              : null
          }
          name={fields.locationFrom.name}
          label={t("userHub.startDestination")}
          required
          options={addresses.filter((address) => address?.id !== undefined)}
          disabled={isEditing}
          getOptionLabel={(option) => option?.id ?? ""}
          containerProps={{ sx: { flex: 1 } }}
        />
        <Autocomplete
          {...getSelectProps(fields.locationTo)}
          value={addresses[0] ? { id: addresses[0]?.id ?? "" } : null}
          name={fields.locationTo.name}
          label={t("userHub.endDestination")}
          required
          options={addresses.filter((address) => address?.id !== undefined)}
          disabled={isEditing}
          getOptionLabel={(option) => option?.id ?? ""}
          containerProps={{ sx: { flex: 1 } }}
        />
      </Flex>
      <TextInput
        label={t("userHub.mileage")}
        containerProps={{ sx: { flex: 1 } }}
        {...getInputProps(fields.distanceInKM, { type: "number" })}
        key={fields.distanceInKM.key}
        error={!!fields.distanceInKM.errors}
        errorMessage={t(fields.distanceInKM.errors?.[0] ?? "")}
        required
      />
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
      <Flex alignItems="center" gap="10px">
        <InfoCircleOutlined style={{ color: theme.palette.primary.main }} />
        <Typography variant="body1">
          <Trans i18nKey="userHub.activityNotificationEmail" t={t} />
        </Typography>
      </Flex>
    </>
  );
}
