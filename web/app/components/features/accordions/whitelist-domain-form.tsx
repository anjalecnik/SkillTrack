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
import { IWorkspaceSettingsFormCommonProps } from "~/types";
import { whitelistDomainFormSchema as schema } from "~/schemas";

export function WhiteListDomainForm({
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
  const descriptionDomains =
    workspace.whitelistDomains.join(", ") ||
    t("workspaceSettings.whitelistDomainSubtitle");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`whitelist-domain-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.whitelistDomain")}
        desc={descriptionDomains}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormArray<string>
            fieldName="whitelistDomains"
            defaultValue={workspace.whitelistDomains}
            render={(domain, index) => {
              return (
                <FlexColumn key={index} gap="20px">
                  <FormTextInput
                    fieldName={`whitelistDomains[${index}]`}
                    defaultValue={domain}
                  />
                  <FormRemoveButton fieldName="whitelistDomains" index={index}>
                    {t("workspaceSettings.removeDomain")}
                  </FormRemoveButton>
                </FlexColumn>
              );
            }}
          />
          <FormAddButton fieldName="whitelistDomains">
            {t("workspaceSettings.addDomain")}
          </FormAddButton>
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
