import {
  IWorkspaceSettingsFormCommonProps,
  WorkspaceAddressType,
} from "~/types";
import {
  Flex,
  FormAccordion,
  FormCountryInput,
  FormHiddenInput,
  FormPhoneNumberInput,
  FormTextInput,
  FormWrapper,
  PaddedFlexColumn,
} from "~/components/common";
import { basicInfoFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";

export function BasicInfoForm({
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

  const mainAddress = workspace.addresses?.find(
    (address) => address.type === WorkspaceAddressType.Main
  );

  const additionalAddresses = workspace.addresses?.filter(
    (address) => address.type === WorkspaceAddressType.Branch
  );

  const description =
    `${workspace.name}, ${workspace.email}` +
    (workspace?.fullPhone ? `, ${workspace.fullPhone}` : "");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`basic-info-form-${isCancelPressed}`}
      shouldValidate="onInput"
      intent={intent}
      groupRequire={[
        ["phone", "countryPhoneCode"],
        ["streetAddress", "city", "postalCode", "countryCode"],
      ]}
    >
      <FormAccordion
        open={open}
        title={t("workspaceSettings.basicInformation")}
        desc={description}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        isLoading={isLoading}
        borderTop
      >
        <PaddedFlexColumn>
          <FormHiddenInput
            fieldName="additionalAddresses"
            defaultValue={JSON.stringify(additionalAddresses) as string}
          />
          <FormHiddenInput
            fieldName="addressId"
            defaultValue={mainAddress?.id}
          />
          <FormTextInput
            fieldName="name"
            label={t("workspaceSettings.companyName")}
            required
            autoComplete="organization"
            defaultValue={workspace.name}
          />
          <FormTextInput
            fieldName="email"
            label={t("workspaceSettings.companyEmail")}
            required
            defaultValue={workspace.email}
          />
          <FormPhoneNumberInput
            label={t("workspaceSettings.companyPhoneNumber")}
            numberFieldName="phone"
            numberDefaultValue={workspace.phone}
            countryCodeFieldName="countryPhoneCode"
            countryCodeDefaultValue={`+${workspace.countryPhoneCode}`}
          />
          <FormTextInput
            fieldName="streetAddress"
            label={t("workspaceSettings.companyAddress")}
            secondaryLabel={t("workspaceSettings.addressSubtitle")}
            defaultValue={mainAddress?.streetAddress}
            data-testid="companyAddressInput"
          />
          <Flex justifyContent="space-between" gap="50px">
            <FormTextInput
              fieldName="city"
              label={t("workspaceSettings.city")}
              containerProps={{ sx: { flex: 1 } }}
              defaultValue={mainAddress?.city}
              data-testid="companyCityInput"
            />
            <FormTextInput
              fieldName="postalCode"
              label={t("workspaceSettings.postNumber")}
              containerProps={{ sx: { flex: 1 } }}
              defaultValue={mainAddress?.postalCode}
              data-testid="postNumberInput"
            />
          </Flex>
          <FormCountryInput
            fieldName="countryCode"
            label={t("workspaceSettings.country")}
            defaultValue={mainAddress?.countryCode}
          />
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
