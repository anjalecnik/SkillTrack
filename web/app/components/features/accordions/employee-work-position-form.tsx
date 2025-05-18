import {
  IPositionResponse,
  IWorkspaceEmployeeFormCommonProps,
  IWorkspaceUserResponse,
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
  workspaceUsers: IWorkspaceUserResponse[];
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
    workspaceUser.workspaceWorkPosition?.name && workspaceUser.manager?.name
      ? `${workspaceUser.workspaceWorkPosition.name} - ${fullNameFormatter(
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
          {/* <Autocomplete
               {...getSelectProps(fields.workspaceTeamId)}
              // key={fields.workspaceTeamId.key}
              name={fields.workspaceTeamId.name}
              options={workspaceTeams}
              label={t("workspaceEmployees.department")}
              value={workspaceUser.workspaceTeam}
              getOptionLabel={(option) => option.name ?? ""}
            /> */}

          <FormAutocompleteInput<IPositionResponse>
            fieldName="workspaceWorkPositionId"
            label={t("workspaceEmployees.jobTitle")}
            options={workspacePositions}
            defaultValue={
              workspaceUser.workspaceWorkPosition as unknown as IPositionResponse
            }
            getOptionLabel={(option) => option?.name ?? ""}
          />
          <FormAutocompleteInput<IWorkspaceUserResponse>
            fieldName="managerId"
            label={t("workspaceEmployees.supervisor")}
            options={workspaceUsers}
            defaultValue={workspaceUser.manager as IWorkspaceUserResponse}
            getOptionLabel={(user) =>
              fullNameFormatter(user as IWorkspaceUserResponse) ?? ""
            }
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
