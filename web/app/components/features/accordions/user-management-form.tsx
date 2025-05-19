import { useTranslation } from "react-i18next";
import {
  PaddedFlexColumn,
  FormWrapper,
  FormAutocompleteInput,
  FormSelectWithChips,
  FormAccordion,
} from "~/components/common";
import {
  IUser,
  IWorkspaceSettingsFormCommonProps,
  IWorkspaceUserResponse,
} from "~/types";
import { userManagementFormSchema as schema } from "~/schemas";

interface IUserManagementFormProps extends IWorkspaceSettingsFormCommonProps {
  users: IWorkspaceUserResponse[];
}

export function UserManagementForm({
  lastResult,
  workspace,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  users,
  isCancelPressed,
}: IUserManagementFormProps) {
  const { t } = useTranslation();
  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`user-management-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        open={open}
        title={t("workspaceSettings.userManagement")}
        desc={t("workspaceSettings.userManagementSubtitle")}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        isLoading={isLoading}
        borderTop
      >
        <PaddedFlexColumn>
          <FormAutocompleteInput<IUser>
            fieldName="ownerId"
            label={t("workspaceSettings.ownerLabel")}
            options={users}
            defaultValue={workspace.owner}
            required
            disabled={!users.length}
            getOptionLabel={(user) => `${user?.name} ${user?.surname}`}
          />
          <FormSelectWithChips
            fieldName="adminIds"
            defaultValue={JSON.stringify(workspace.admins ?? [])}
            options={users.map((user) => {
              return { id: user.id, name: user.name, surname: user.surname };
            })}
            multiple={true}
            label={t("workspaceSettings.adminLabel")}
            placeholder={t("workspaceSettings.adminPlaceholder")}
            resetValue={isCancelPressed}
            avatarImage={(option) => option.name ?? ""}
            labelExtractor={(option) => `${option.name} ${option.surname}`}
            valueExtractor={(option) => option.id}
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
