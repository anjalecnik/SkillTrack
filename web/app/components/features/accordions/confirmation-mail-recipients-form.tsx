import { useTranslation } from "react-i18next";
import {
  FlexColumn,
  PaddedFlexColumn,
  FormWrapper,
  FormArray,
  FormTextInput,
  FormRemoveButton,
  FormAddButton,
  FormAccordion,
} from "~/components/common";
import { additionalReceiptsAfterConfirmation as schema } from "~/schemas";
import { IWorkspaceSettingsFormCommonProps } from "~/types";

export function ConfirmationMailRecipientsForm({
  lastResult,
  workspace,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkspaceSettingsFormCommonProps) {
  const { t } = useTranslation();
  const description = t(
    "workspaceSettings.confirmationEmailRecipientsSubtitle"
  );

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`confirmation-mail-recipients-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onInput"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.confirmationEmailRecipients")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormArray<string>
            fieldName="additionalReceiptsAfterConfirmation"
            defaultValue={workspace.additionalReceiptsAfterConfirmation}
            render={(domain, index) => {
              return (
                <FlexColumn key={index} gap="20px">
                  <FormTextInput
                    fieldName={`additionalReceiptsAfterConfirmation[${index}]`}
                    defaultValue={domain}
                  />
                  <FormRemoveButton
                    fieldName="additionalReceiptsAfterConfirmation"
                    index={index}
                  >
                    {t("workspaceSettings.removeRecipient")}
                  </FormRemoveButton>
                </FlexColumn>
              );
            }}
          />
          <FormAddButton fieldName="additionalReceiptsAfterConfirmation">
            {t("workspaceSettings.addRecipient")}
          </FormAddButton>
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
