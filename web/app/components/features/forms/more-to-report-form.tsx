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
  getMoreToReportTypeLabel,
  IUserResponse,
} from "~/types";
import { businessTripFormDialogSchema } from "~/schemas";
import { parseWithZod } from "@conform-to/zod";
import { z } from "zod";
import { BusinessTripDialogForm } from "~/components/features";
import { useNavigationState } from "~/hooks";
import { fullNameFormatter } from "~/util";
import { Dispatch, SetStateAction, useState } from "react";
import { useSearchParams } from "@remix-run/react";

interface IMoreToReportFormProps {
  lastResult?: SubmissionResult<string[]> | null;
  open: boolean;
  onClose: () => void;
  projects: IProjectUserResponse[];
  selectedType: MoreToReportActivityType;
  defaultValues?: IActivityMoreToReportForm;
  workspaceEmployees?: IUserResponse[];
  isEditing?: boolean;
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
        schema: z.discriminatedUnion("intent", [businessTripFormDialogSchema]),
      });
    },
    shouldRevalidate: "onBlur",
    defaultValue: {
      activityType: selectedType,
      dateStart: defaultValues?.dateStart,
      dateEnd: defaultValues?.dateEnd,
      location: defaultValues?.location,
      distanceInKM: defaultValues?.distanceInKM,
      accommodationCost: defaultValues?.accommodationCost,
      foodCost: defaultValues?.foodCost,
      otherCost: defaultValues?.otherCost,
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
    return ActivityFormDialogs.BusinessTrip;
  };

  const getActivityForm = () => {
    return (
      <BusinessTripDialogForm
        formId={form.id}
        projects={projects}
        isEditing={isEditing}
      />
    );
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
            data-testid="moreToReportSubmitBtn"
            loading={isLoading}
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
                fullNameFormatter(employee as IUserResponse) ?? ""
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
