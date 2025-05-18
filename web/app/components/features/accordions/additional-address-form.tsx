import {
  EmployeeAddressType,
  IAddress,
  IWorkspaceEmployeeFormCommonProps,
} from "~/types";
import {
  Flex,
  FlexColumn,
  PaddedFlexColumn,
  FormWrapper,
  FormTextInput,
  FormCountryInput,
  FormRemoveButton,
  FormAddButton,
  FormHiddenInput,
  FormArray,
} from "~/components/common";
import { addressFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import { FormAccordion } from "../../common/containers/FormAccordion";

export interface IAddressSettingsFormProps
  extends IWorkspaceEmployeeFormCommonProps {
  disabled?: boolean;
}

export function AddressSettingsForm({
  lastResult,
  workspaceUser,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  disabled = false,
  isCancelPressed,
}: IAddressSettingsFormProps) {
  const { t } = useTranslation();

  const mainAddress = workspaceUser.addresses?.find(
    (address) => address.type === EmployeeAddressType.Main
  );
  const additionalAddresses = workspaceUser.addresses?.filter(
    (address) => address.type === EmployeeAddressType.Temporary
  );

  const description = additionalAddresses
    ? additionalAddresses
        .map((address) => `${address.streetAddress}, ${address.city}`)
        .join(", ") || t("workspaceEmployees.addressName")
    : "";

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`additional-address-form-${isLoading}-${isCancelPressed}`}
      shouldValidate="onSubmit"
      intent={intent}
    >
      <FormAccordion
        title={t("workspaceEmployees.additionalAddress")}
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
                    defaultValue={EmployeeAddressType.Temporary}
                  />
                  <FormHiddenInput
                    fieldName={`addresses[${index}].id`}
                    defaultValue={item?.id}
                  />
                  <FormTextInput
                    fieldName={`addresses[${index}].streetAddress`}
                    defaultValue={item?.streetAddress}
                    label={t("workspaceEmployees.address")}
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
