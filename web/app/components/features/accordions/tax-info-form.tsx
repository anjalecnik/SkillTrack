import { useTranslation } from "react-i18next";
import { FormAccordion, PaddedFlexColumn } from "~/components/common";
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { taxInfoFormSchema as schema } from "~/schemas";
import { FormWrapper } from "~/components/common/form/FormWrapper";
import { FormTextInput } from "~/components/common/form/FormInputs";

export function TaxInfoForm({
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

  return (
    <FormWrapper
      lastResult={lastResult}
      id={`tax-info-form-${isLoading}-${isCancelPressed}`}
      schema={schema}
      shouldValidate="onInput"
      intent={intent}
    >
      <FormAccordion
        open={open}
        title={t("workspaceSettings.taxId")}
        desc={workspace.taxId ?? t("workspaceSettings.taxIdSubtitle")}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormTextInput
            fieldName="taxId"
            label={t("workspaceSettings.companyTaxId")}
            defaultValue={workspace.taxId}
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
