import { useTranslation } from "react-i18next";
import {
  Flex,
  FlexColumn,
  PaddedFlexColumn,
  FormWrapper,
  FormHiddenInput,
  FormTextInput,
  FormCountryInput,
  FormAddButton,
  FormRemoveButton,
  FormArray,
  FormAccordion,
} from "~/components/common";
import {
  IAddress,
  IWorkspaceSettingsFormCommonProps,
  WorkspaceAddressType,
} from "~/types";
import { additionalAddressesFormSchema as schema } from "~/schemas";

interface IAdditionalAddressesFormProps
  extends IWorkspaceSettingsFormCommonProps {
  disabled?: boolean;
}

export function AdditionalAddressesForm({
  lastResult,
  workspace,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  disabled = false,
  isCancelPressed,
}: IAdditionalAddressesFormProps) {
  const { t } = useTranslation();

  const additionalAddresses = workspace.addresses?.filter(
    (address) => address.type === WorkspaceAddressType.Branch
  );
  const mainAddress = workspace.addresses?.find(
    (address) => address.type === WorkspaceAddressType.Main
  );
  const description =
    additionalAddresses
      .map((address) => address.streetAddress + ", " + address.city)
      .join(", ") || t("workspaceSettings.additionalAddressSubtitle");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`additional-addresses-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceSettings.additionalAddress")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        isLoading={isLoading}
        disabled={disabled}
        borderTop
      >
        <PaddedFlexColumn>
          <FormHiddenInput
            fieldName="mainAddress"
            defaultValue={JSON.stringify(mainAddress)}
          />
          <FormArray<IAddress>
            fieldName="addresses"
            defaultValue={additionalAddresses}
            render={(item, index) => {
              return (
                <FlexColumn key={index} gap="20px">
                  <FormHiddenInput
                    fieldName={`addresses[${index}].type`}
                    defaultValue={WorkspaceAddressType.Branch}
                  />
                  <FormHiddenInput
                    fieldName={`addresses[${index}].id`}
                    defaultValue={item?.id}
                  />
                  <FormTextInput
                    fieldName={`addresses[${index}].streetAddress`}
                    defaultValue={item?.streetAddress}
                    label={t("workspaceSettings.branchOfficeAddress")}
                    required
                  />
                  <Flex justifyContent="space-between" gap="50px">
                    <FormTextInput
                      fieldName={`addresses[${index}].city`}
                      defaultValue={item?.city}
                      label={t("workspaceSettings.city")}
                      containerProps={{ sx: { flex: 1 } }}
                      required
                    />
                    <FormTextInput
                      fieldName={`addresses[${index}].postalCode`}
                      defaultValue={item?.postalCode}
                      label={t("workspaceSettings.postNumber")}
                      containerProps={{ sx: { flex: 1 } }}
                      required
                    />
                  </Flex>
                  <FormCountryInput
                    variant="countryName"
                    returnValue="countryCode"
                    fieldName={`addresses[${index}].countryCode`}
                    defaultValue={item?.countryCode}
                    label={t("workspaceSettings.country")}
                    required
                  />
                  <FormRemoveButton fieldName="addresses" index={index}>
                    {t("workspaceSettings.removeAddress")}
                  </FormRemoveButton>
                </FlexColumn>
              );
            }}
          />

          <FormAddButton fieldName="addresses">
            {t("workspaceSettings.addAddress")}
          </FormAddButton>
        </PaddedFlexColumn>
      </FormAccordion>
    </FormWrapper>
  );
}
