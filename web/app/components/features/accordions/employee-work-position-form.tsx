import {
  IPositionResponse,
  IWorkspaceEmployeeFormCommonProps,
  IUserResponse,
} from "~/types";
import { workPositionFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import { fullNameFormatter } from "~/util";
import {
  FormAccordion,
  FormAutocompleteInput,
  FormWrapper,
  PaddedFlexColumn,
} from "~/components/common";

export interface IWorkPositionFormProps
  extends IWorkspaceEmployeeFormCommonProps {
  workspacePositions: IPositionResponse[];
  workspaceUsers: IUserResponse[];
}

export function EmployeeWorkPositionForm({
  lastResult,
  workspaceUser,
  workspacePositions,
  workspaceUsers,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkPositionFormProps) {
  const { t } = useTranslation();

  const description =
    workspaceUser.workPosition?.name && workspaceUser.manager?.name
      ? `${workspaceUser.workPosition.name} - ${fullNameFormatter(
          workspaceUser.manager
        )}`
      : t("workspaceEmployees.workPositionSubtitle");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`employment-position-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspacePositions.workPosition")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        isLoading={isLoading}
        borderTop
      >
        <PaddedFlexColumn>
          <FormAutocompleteInput<IPositionResponse>
            fieldName="workspaceWorkPositionId"
            label={t("workspaceEmployees.jobTitle")}
            options={workspacePositions}
            defaultValue={
              workspaceUser.workPosition as unknown as IPositionResponse
            }
            getOptionLabel={(option) => option?.name ?? ""}
          />
          <FormAutocompleteInput<IUserResponse>
            fieldName="managerId"
            label={t("workspaceEmployees.supervisor")}
            options={workspaceUsers}
            defaultValue={workspaceUser.manager as IUserResponse}
            getOptionLabel={(user) =>
              fullNameFormatter(user as IUserResponse) ?? ""
            }
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
