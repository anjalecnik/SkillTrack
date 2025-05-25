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
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  Flex,
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
  IWorkspaceModuleActivity,
  ActivityTypeLowerCase,
  IUserResponse,
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
  workspaceEmployees?: IUserResponse[];
  reportingActivitySettings?: IWorkspaceModuleActivity;
}

export function PlanAbsenceForm({
  lastResult,
  open,
  onClose,
  defaultType,
  workspaceEmployees,
  reportingActivitySettings,
}: IPlanAbsenceFormProps) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] =
    useState<PlanAbsenceActivityType | null>(defaultType ?? null);
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

  const handleEmployeeChange = (value: number) => {
    setSelectedEmployeeId(value as number);
    searchParams.set("employeeId", value.toString());
    setSearchParams(searchParams, { replace: true });
  };

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
                fullNameFormatter(employee as IUserResponse) ?? ""
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
            enumType={PlanAbsenceActivityType}
            placeholder={t("userHub.absenceType")}
            {...getSelectProps(fields.activityType)}
            key={fields.activityType.key}
            defaultValue={selectedType}
            labelFunction={getAbsenceTypeLabel}
            onChange={handleSelectedType}
            required
          />
          <Flex justifyContent="space-between" gap="20px">
            <DateInput
              label={t("common.dateFrom")}
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
          </Flex>
        </PaddedFlexColumn>
      </FormDialog>
    </FormProvider>
  );
}
