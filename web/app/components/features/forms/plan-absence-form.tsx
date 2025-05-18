import { InfoCircleOutlined } from "@ant-design/icons";
import {
  FormProvider,
  SubmissionResult,
  getSelectProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import {
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import {
  Flex,
  TextInput,
  DateInput,
  EnumSelect,
  Autocomplete,
  FormDialog,
  Button,
  PaddedFlexColumn,
  TimeSelect,
} from "~/components/common";
import {
  PlanAbsenceActivityType,
  getAbsenceTypeLabel,
  ActivityFormDialogs,
  IWorkspaceUserResponse,
  SpecialLeaveActivityType,
  getSpecialLeaveTypeLabel,
  IWorkspaceModuleActivity,
  ActivityTypeLowerCase,
} from "~/types";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useNavigationState } from "~/hooks";
import { fullNameFormatter } from "~/util";
import { useSearchParams } from "@remix-run/react";

interface IPlanAbsenceFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  open: boolean;
  onClose: () => void;
  defaultType?: PlanAbsenceActivityType | null;
  workspaceEmployees?: IWorkspaceUserResponse[];
  showSpecialLeave?: boolean;
  reportingActivitySettings?: IWorkspaceModuleActivity;
}

export function PlanAbsenceForm({
  lastResult,
  open,
  onClose,
  defaultType,
  workspaceEmployees,
  showSpecialLeave,
  reportingActivitySettings,
}: IPlanAbsenceFormProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedType, setSelectedType] =
    useState<PlanAbsenceActivityType | null>(defaultType ?? null);
  const [selectedSpecialLeaveType, setSelectedSpecialLeaveType] =
    useState<SpecialLeaveActivityType | null>(null);
  const [partialSickLeave, setPartialSickLeave] = useState(false);
  const { isLoading } = useNavigationState();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | "">("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [minDate, setMinDate] = useState<Dayjs | undefined>(undefined);

  const [form, fields] = useForm({
    lastResult,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    defaultValue: {
      activityType: selectedType,
      dateStart: "",
      dateEnd: "",
      specialLeaveActivityType: null,
      startTime: "",
      endTime: "",
      employeeId: "",
      description: "",
    },
  });
  const control = useInputControl(fields.dateEnd);

  const updatedReportingActivitySettings = reportingActivitySettings
    ? (() => {
        const newSettings: IWorkspaceModuleActivity = {
          ...reportingActivitySettings,
        };
        Object.entries(reportingActivitySettings).forEach(([key, value]) => {
          newSettings[key as keyof typeof reportingActivitySettings] = {
            ...value,
            maximumDateInPast: dayjs().subtract(
              value.maximumDaysInPast,
              "days"
            ),
          };
        });
        return newSettings;
      })()
    : undefined;

  const isSupervisor = workspaceEmployees?.length;

  const closeAndResetForm = () => {
    setSelectedType(null);
    setSelectedSpecialLeaveType(null);
    setPartialSickLeave(false);
    form.reset();
    onClose();
    searchParams.delete("employeeId");
    setSearchParams(searchParams, { replace: true });
    setSelectedEmployeeId("");
  };

  const handleSelectedType = (
    e: SelectChangeEvent<PlanAbsenceActivityType>
  ) => {
    const newType = e.target.value as PlanAbsenceActivityType;
    setSelectedType(newType);
    setPartialSickLeave(false);
    setSelectedSpecialLeaveType(null);

    if (updatedReportingActivitySettings) {
      const newTypeLowerCase =
        newType.charAt(0).toLowerCase() + newType.slice(1);

      const activitySettings =
        updatedReportingActivitySettings[
          newTypeLowerCase as ActivityTypeLowerCase
        ];

      const minDateTmp = activitySettings?.maximumDateInPast
        ? dayjs(activitySettings?.maximumDateInPast)
        : undefined;

      setMinDate(minDateTmp);
    }
  };

  const handleSelectedSpecialLeaveType = (
    e: SelectChangeEvent<SpecialLeaveActivityType>
  ) => {
    const newType = e.target.value as SpecialLeaveActivityType;
    setSelectedSpecialLeaveType(newType);
    setPartialSickLeave(false);
  };

  const handlePartialSickLeaveChange = (
    e: React.SyntheticEvent,
    checked: boolean
  ) => {
    setPartialSickLeave(checked);
  };

  const handleEmployeeChange = (value: number) => {
    setSelectedEmployeeId(value as number);
    searchParams.set("employeeId", value.toString());
    setSearchParams(searchParams, { replace: true });
  };

  const absenceTypeOptions = Object.fromEntries(
    Object.entries(PlanAbsenceActivityType).filter(
      ([, value]) =>
        showSpecialLeave || value !== PlanAbsenceActivityType.SpecialLeave
    )
  );

  useEffect(() => {
    if (defaultType) {
      setSelectedType(defaultType);
    }
  }, [defaultType]);

  return (
    <FormProvider context={form.context}>
      <FormDialog
        open={open}
        onClose={closeAndResetForm}
        title={t("userHub.planAbsence")}
        formId={form.id}
        footer={
          <>
            <Button
              variant="outlined"
              name="intent"
              onClick={closeAndResetForm}
              type="button"
              disabled={isLoading}
            >
              {t("common.cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              loading={isLoading}
            >
              {t("userHub.plan")}
            </Button>
          </>
        }
      >
        <PaddedFlexColumn>
          <input
            type="hidden"
            name="intent"
            value={ActivityFormDialogs.PlanAbsence}
          />
          <input
            type="hidden"
            name="activityType"
            value={selectedType ?? undefined}
          />
          {isSupervisor && (
            <Autocomplete
              name="employeeId"
              label={t("workspaceRequests.employeeName")}
              options={workspaceEmployees ?? []}
              value={workspaceEmployees?.find(
                (employee) => employee.id === selectedEmployeeId
              )}
              getOptionLabel={(employee) =>
                fullNameFormatter(employee as IWorkspaceUserResponse) ?? ""
              }
              onChange={(_, value) => {
                if (value) {
                  handleEmployeeChange(value);
                }
              }}
              required
            />
          )}
          <EnumSelect<PlanAbsenceActivityType>
            label={t("userHub.absenceType")}
            enumType={absenceTypeOptions}
            placeholder={t("userHub.absenceType")}
            {...getSelectProps(fields.activityType)}
            key={fields.activityType.key}
            defaultValue={selectedType}
            labelFunction={getAbsenceTypeLabel}
            onChange={handleSelectedType}
            required
          />
          {selectedType === PlanAbsenceActivityType.SpecialLeave && (
            <EnumSelect<SpecialLeaveActivityType>
              label={t("userHub.specialLeaveType")}
              enumType={SpecialLeaveActivityType}
              placeholder={t("userHub.specialLeaveType")}
              {...getSelectProps(fields.specialLeaveActivityType)}
              key={fields.specialLeaveActivityType.key}
              defaultValue={selectedSpecialLeaveType}
              labelFunction={getSpecialLeaveTypeLabel}
              onChange={handleSelectedSpecialLeaveType}
              required
            />
          )}
          <Flex justifyContent="space-between" gap="20px">
            <DateInput
              label={t(partialSickLeave ? "common.date" : "common.dateFrom")}
              name={fields.dateStart.name}
              containerProps={{ sx: { flex: 1 } }}
              format="DD.MM.YYYY"
              value={
                fields.dateStart.value
                  ? dayjs(fields.dateStart.value, "DD.MM.YYYY")
                  : undefined
              }
              onChange={(date) => {
                const formatted = date?.format("DD.MM.YYYY") ?? "";
                if (!form.value?.dateEnd) {
                  control.change(formatted);
                }
              }}
              minDate={minDate}
              required
            />
            {!partialSickLeave && (
              <DateInput
                label={t("common.dateTo")}
                name={fields.dateEnd.name as string}
                containerProps={{ sx: { flex: 1 } }}
                format="DD.MM.YYYY"
                value={
                  fields.dateEnd.value
                    ? dayjs(fields.dateEnd.value, "DD.MM.YYYY")
                    : undefined
                }
                minDate={
                  fields.dateStart.value
                    ? dayjs(fields.dateStart.value, "DD.MM.YYYY")
                    : minDate
                }
                required
              />
            )}
          </Flex>

          {partialSickLeave && (
            <Flex justifyContent="space-between" gap="20px">
              <input
                type="hidden"
                name="dateEnd"
                value={fields.dateStart.value || ""}
              />
              <TimeSelect
                label={t("userHub.startTime")}
                containerProps={{ sx: { flex: 1 } }}
                name="timeStart"
                defaultValue={fields.startTime.initialValue}
                required
              />
              <TimeSelect
                label={t("userHub.endTime")}
                containerProps={{ sx: { flex: 1 } }}
                name="timeEnd"
                defaultValue={fields.endTime.initialValue}
                required
                errorMessage={t(fields.endTime.errors?.[0] ?? "")}
              />
            </Flex>
          )}
          {selectedSpecialLeaveType === SpecialLeaveActivityType.Other &&
            selectedType === PlanAbsenceActivityType.SpecialLeave && (
              <TextInput
                name="description"
                label={t("userHub.description")}
                multiline
                rows={2}
                required
              />
            )}
          {selectedType === PlanAbsenceActivityType.SickLeave && (
            <Flex>
              <FormControlLabel
                control={<Checkbox checked={partialSickLeave} />}
                label={t("userHub.partialSickLeave")}
                labelPlacement="end"
                onChange={handlePartialSickLeaveChange}
                sx={{ ml: "1px" }}
              />
            </Flex>
          )}

          {!isSupervisor && (
            <Flex alignItems="center" gap="5px">
              <InfoCircleOutlined
                style={{
                  color: theme.palette.primary.main,
                }}
              />
              <Typography variant="body1">
                <Trans i18nKey="userHub.activityNotificationEmail" t={t} />
              </Typography>
            </Flex>
          )}
        </PaddedFlexColumn>
      </FormDialog>
    </FormProvider>
  );
}
