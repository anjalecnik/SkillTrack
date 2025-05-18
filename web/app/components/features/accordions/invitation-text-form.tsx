import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PaddedFlexColumn,
  FormWrapper,
  FormTextInput,
  FormAccordion,
} from "~/components/common";
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { invitationTextFormSchema as schema } from "~/schemas";

export function InvitationTextForm({
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
  const [textLength, setTextLength] = useState<number>();

  useEffect(() => {
    if (workspace.invitationText) {
      setTextLength(workspace.invitationText.length);
    }
  }, [isCancelPressed, workspace.invitationText]);

  const description =
    workspace.invitationText ?? t("workspaceSettings.invitationTextSubtitle");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`invitation-text-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.invitationText")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormTextInput
            fieldName="invitationText"
            defaultValue={workspace?.invitationText}
            required
            onChange={(value) => setTextLength(value.length)}
            maxLength={500}
            length={textLength}
            showLength
            rows={4}
            multiline
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
