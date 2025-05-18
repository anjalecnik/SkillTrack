import {
  FormProvider,
  SubmissionResult,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  EnumSelect,
  Autocomplete,
  FormDialog,
  Button,
  PaddedFlexColumn,
} from "~/components/common";
import {
  ActivityFormDialogs,
  IProjectUserResponse,
  MoreToReportActivityType,
  IActivityMoreToReportForm,
  IWorkspaceUserResponse,
  getMoreToReportTypeLabel,
  IAddress,
  IWorkspaceModuleActivity,
} from "~/types";
import {
  businessTripFormDialogSchema,
  overtimeFormDialogSchema,
  onCallFormDialogSchema,
  expensesFormDialogSchema,
  tripToOfficeFormDialogSchema,
} from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import {
  BusinessTripDialogForm,
  ExpensesDialogForm,
  OnCallDialogForm,
  OvertimeDialogForm,
  TripToOfficeDialogForm,
} from "~/components/features";
import { useNavigationState } from "~/hooks";
import { fullNameFormatter } from "~/util";
import { Dispatch, SetStateAction, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import dayjs from "dayjs";
import { DataTestIds } from "~/data-test-ids";

interface IMoreToReportFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  open: boolean;
  onClose: () => void;
  projects: IProjectUserResponse[];
  selectedType: MoreToReportActivityType;
  defaultValues?: IActivityMoreToReportForm;
  workspaceEmployees?: IWorkspaceUserResponse[];
  isEditing?: boolean;
  workspaceAddresses: IAddress[];
  userAddresses: IAddress[];
  reportingActivitySettings?: IWorkspaceModuleActivity;
  setSelectedMoreToReportType: Dispatch<
    SetStateAction<MoreToReportActivityType>
  >;
}

export function MoreToReportForm({
  lastResult,
  open,
  onClose,
  projects,
  selectedType,
  defaultValues,
  workspaceEmployees,
  isEditing,
  workspaceAddresses,
  userAddresses,
  reportingActivitySettings,
  setSelectedMoreToReportType,
}: IMoreToReportFormProps) {
  const { t } = useTranslation();
  const { isLoading } = useNavigationState();
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | "">("");
  const [searchParams, setSearchParams] = useSearchParams();
  const isSupervisor = workspaceEmployees?.length;

  const handleTypeChange = (e: SelectChangeEvent<unknown>) => {
    setSelectedMoreToReportType(e.target.value as MoreToReportActivityType);
  };

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: z.discriminatedUnion("intent", [
          overtimeFormDialogSchema,
          businessTripFormDialogSchema,
          tripToOfficeFormDialogSchema,
          onCallFormDialogSchema,
          expensesFormDialogSchema,
        ]),
      });
    },
    shouldRevalidate: "onBlur",
    defaultValue: {
      activityType: selectedType,
      date: defaultValues?.date,
      dateStart: defaultValues?.dateStart,
      dateEnd: defaultValues?.dateEnd,
      startTime: defaultValues?.startTime,
      departureTime: defaultValues?.departureTime,
      returnTime: defaultValues?.returnTime,
      location: defaultValues?.location,
      distanceInKM: defaultValues?.distanceInKM,
      description: defaultValues?.description,
      activityId: defaultValues?.activityId,
    },
    id: `more-to-report-form-${open}-${selectedType}-${selectedEmployeeId}`,
  });

  const closeAndResetForm = () => {
    onClose();
    form.reset();
    searchParams.delete("employeeId");
    setSearchParams(searchParams, { replace: true });
    setSelectedEmployeeId("");
  };

  const getIntentForSelectedForm = () => {
    switch (selectedType) {
      case MoreToReportActivityType.Overtime:
        return ActivityFormDialogs.Overtime;
      case MoreToReportActivityType.OnCall:
        return ActivityFormDialogs.OnCall;
      case MoreToReportActivityType.BusinessTrip:
        return ActivityFormDialogs.BusinessTrip;
      case MoreToReportActivityType.TripToOffice:
        return ActivityFormDialogs.TripToOffice;
      case MoreToReportActivityType.Expense:
        return ActivityFormDialogs.Expense;
      default:
        return ActivityFormDialogs.Overtime;
    }
  };

  if (reportingActivitySettings) {
    Object.entries(reportingActivitySettings).forEach(([, value]) => {
      value.maximumDateInPast = dayjs().subtract(
        value.maximumDaysInPast,
        "days"
      );
    });
  }

  const getActivityForm = () => {
    switch (selectedType) {
      case MoreToReportActivityType.Overtime:
        return (
          <OvertimeDialogForm
            formId={form.id}
            projects={projects}
            minReportingDate={
              reportingActivitySettings?.overtime.maximumDateInPast
            }
          />
        );
      case MoreToReportActivityType.OnCall:
        return (
          <OnCallDialogForm
            formId={form.id}
            projects={projects}
            minReportingDate={
              reportingActivitySettings?.onCall.maximumDateInPast
            }
          />
        );
      case MoreToReportActivityType.BusinessTrip:
        return (
          <BusinessTripDialogForm
            formId={form.id}
            projects={projects}
            isEditing={isEditing}
            minReportingDate={
              reportingActivitySettings?.businessTrip.maximumDateInPast
            }
          />
        );
      case MoreToReportActivityType.TripToOffice:
        return (
          <TripToOfficeDialogForm
            formId={form.id}
            projects={projects}
            isEditing={isEditing}
            workspaceAddresses={workspaceAddresses}
            userAddresses={userAddresses}
            minReportingDate={
              reportingActivitySettings?.tripToOffice.maximumDateInPast
            }
          />
        );
      case MoreToReportActivityType.Expense:
        return (
          <ExpensesDialogForm
            formId={form.id}
            projects={projects}
            minReportingDate={
              reportingActivitySettings?.expense.maximumDateInPast
            }
          />
        );
      default:
        return (
          <OvertimeDialogForm
            formId={form.id}
            projects={projects}
            minReportingDate={
              reportingActivitySettings?.overtime.maximumDateInPast
            }
          />
        );
    }
  };

  const handleEmployeeChange = (value: number) => {
    setSelectedEmployeeId(value as number);
    searchParams.set("employeeId", value.toString());
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <FormDialog
      open={open}
      onClose={closeAndResetForm}
      title={t("userHub.moreToReport")}
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
            data-testid={DataTestIds.moreToReport.submitButton}
          >
            {t("userHub.report")}
          </Button>
        </>
      }
    >
      <PaddedFlexColumn>
        <FormProvider context={form.context}>
          <input
            type="hidden"
            name="intent"
            value={getIntentForSelectedForm()}
          />
          <input
            type="hidden"
            name="activityId"
            value={fields.activityId.value}
          />

          <input type="hidden" name="activityType" value={selectedType} />
          {isSupervisor && (
            <Autocomplete
              data-testid="employeeDropdown"
              name="employeeId"
              label={t("workspaceRequests.employeeName")}
              options={workspaceEmployees ?? []}
              value={
                workspaceEmployees?.find((employee) =>
                  isEditing
                    ? employee.id === defaultValues?.employeeId
                    : employee.id === selectedEmployeeId
                ) ?? null
              }
              getOptionLabel={(employee) =>
                fullNameFormatter(employee as IWorkspaceUserResponse) ?? ""
              }
              onChange={(_, value) => {
                if (value) {
                  handleEmployeeChange(value);
                }
              }}
              required
              disabled={isEditing}
            />
          )}
          <EnumSelect<MoreToReportActivityType>
            label={t("userHub.type")}
            enumType={MoreToReportActivityType}
            placeholder={t("userHub.type")!}
            {...getSelectProps(fields.activityType)}
            key={fields.activityType.key}
            defaultValue={selectedType}
            disabled={isEditing}
            labelFunction={getMoreToReportTypeLabel}
            onChange={handleTypeChange}
            data-testid="activityTypeDropdown"
            required
          />
          {getActivityForm()}
        </FormProvider>
      </PaddedFlexColumn>
    </FormDialog>
  );
}
