import { t } from "i18next";
import {
  FormAccordion,
  FormEnumSelect,
  FormWrapper,
  PaddedFlexColumn,
} from "~/components/common";
import {
  getUserStatusWithoutInvitedLabel,
  IWorkspaceEmployeeFormCommonProps,
  UserStatus,
  UserStatusWithoutInvited,
} from "~/types";
import { employeeStatusFormSchema as schema } from "~/schemas";

export function UserStatusForm({
  lastResult,
  intent,
  isCancelPressed,
  isLoading,
  open,
  workspaceUser,
  onAccordionClick,
  onCancelClick,
}: IWorkspaceEmployeeFormCommonProps) {
  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`user-status-form-${isCancelPressed}`}
      shouldValidate="onInput"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceEmployees.status")}
        desc={t("workspaceEmployees.currentStatus")}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={() => onCancelClick}
        isLoading={isLoading}
        open={open}
        borderTop
      >
        <PaddedFlexColumn>
          <FormEnumSelect<UserStatusWithoutInvited>
            label={t("workspaceEmployees.status")}
            enumType={UserStatusWithoutInvited}
            value={
              (workspaceUser.status === UserStatus.Active ||
              workspaceUser.status === UserStatus.Deactivated
                ? workspaceUser.status
                : undefined) as UserStatusWithoutInvited | undefined
            }
            defaultValue={
              (workspaceUser.status === UserStatus.Active ||
              workspaceUser.status === UserStatus.Deactivated
                ? workspaceUser.status
                : undefined) as UserStatusWithoutInvited | undefined
            }
            fieldName="status"
            labelFunction={getUserStatusWithoutInvitedLabel}
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
