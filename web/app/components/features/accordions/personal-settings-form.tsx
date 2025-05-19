import {
  EmployeeAddressType,
  getWorkspaceGenderLabel,
  IWorkspaceEmployeeFormCommonProps,
  WorkspaceUserGender,
} from "~/types";
import {
  Flex,
  PaddedFlexColumn,
  FormWrapper,
  FormHiddenInput,
  FormTextInput,
  FormEnumSelect,
  FormCountryInput,
  FormDateInput,
  FormPhoneNumberInput,
  FormAccordion,
} from "~/components/common";
import { personalSettingsFormSchema as schema } from "~/schemas";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

export function PersonalSettingsForm({
  lastResult,
  workspaceUser,
  open,
  onAccordionClick,
  onCancelClick,
  intent,
  isLoading,
  isCancelPressed,
}: IWorkspaceEmployeeFormCommonProps) {
  const { t } = useTranslation();

  const mainAddress = workspaceUser.addresses?.find(
    (address) => address.type === EmployeeAddressType.Main
  );

  const additionalAddresses = workspaceUser.addresses?.filter(
    (address) => address.type === EmployeeAddressType.Temporary
  );

  const description =
    `${workspaceUser.name}, ${workspaceUser.surname}, ${workspaceUser.email}` +
    (workspaceUser?.fullPhone ? `, ${workspaceUser.fullPhone}` : "");

  return (
    <FormWrapper
      lastResult={lastResult}
      schema={schema}
      id={`personal-settings-form-${isCancelPressed}`}
      shouldValidate="onInput"
      intent={intent}
      groupRequire={[
        ["phone", "countryPhoneCode"],
        ["streetAddress", "city", "postalCode", "countryCode"],
      ]}
    >
      <FormAccordion
        title={t("workspaceEmployees.personalSettings")}
        desc={description}
        open={open}
        onAccordionClick={() => onAccordionClick(intent)}
        onCancelClick={onCancelClick}
        borderTop
        isLoading={isLoading}
      >
        <PaddedFlexColumn>
          <FormHiddenInput
            fieldName="additionalAddresses"
            defaultValue={JSON.stringify(additionalAddresses)}
          />
          <FormHiddenInput
            fieldName="addressId"
            defaultValue={mainAddress?.id}
          />
          <FormHiddenInput
            fieldName="email"
            defaultValue={workspaceUser.email}
          />
          <Flex justifyContent="space-between" gap="50px">
            <FormTextInput
              fieldName="name"
              defaultValue={workspaceUser.name}
              label={t("workspaceEmployees.name")}
              containerProps={{ sx: { flex: 1 } }}
              autoComplete="given-name"
              required
            />
            <FormTextInput
              fieldName="surname"
              defaultValue={workspaceUser.surname}
              label={t("workspaceEmployees.surname")}
              containerProps={{ sx: { flex: 1 } }}
              autoComplete="family-name"
              required
            />
          </Flex>
          <Flex justifyContent="space-between" gap="50px">
            <FormEnumSelect<WorkspaceUserGender>
              fieldName="gender"
              defaultValue={workspaceUser.gender as WorkspaceUserGender}
              enumType={WorkspaceUserGender}
              label={t("workspaceEmployees.gender")}
              containerProps={{ sx: { flex: 1 } }}
              labelFunction={getWorkspaceGenderLabel}
            />
            <FormCountryInput
              fieldName="nationality"
              label={t("workspaceEmployees.nationality")}
              variant="nationality"
              returnValue="nationality"
              defaultValue={workspaceUser.nationality}
              containerProps={{ sx: { flex: 1 } }}
            />
          </Flex>
          <FormDateInput
            label={t("workspaceEmployees.dateOfBirth")}
            fieldName="birthDate"
            defaultValue={dayjs(workspaceUser.birthDate, "YYYY-MM-DD")}
            minDate={dayjs().subtract(100, "year")}
            maxDate={dayjs().subtract(15, "year")}
            format="DD.MM.YYYY"
          />
          <FormTextInput
            disabled
            fieldName="email"
            defaultValue={workspaceUser.email}
            key={workspaceUser.email}
            label={t("workspaceEmployees.email")}
          />
          <FormPhoneNumberInput
            label={t("workspaceEmployees.phoneNumber")}
            numberFieldName={"phone"}
            numberDefaultValue={workspaceUser.phone}
            countryCodeFieldName={"countryPhoneCode"}
            countryCodeDefaultValue={
              workspaceUser.countryPhoneCode &&
              `+${workspaceUser.countryPhoneCode}`
            }
          />
          <FormTextInput
            fieldName="streetAddress"
            defaultValue={mainAddress?.streetAddress}
            label={t("workspaceEmployees.address")}
          />
          <Flex justifyContent="space-between" gap="50px">
            <FormTextInput
              fieldName="city"
              defaultValue={mainAddress?.city}
              label={t("workspaceEmployees.city")}
              containerProps={{ sx: { flex: 1 } }}
            />
            <FormTextInput
              fieldName="postalCode"
              defaultValue={mainAddress?.postalCode}
              label={t("workspaceEmployees.post")}
              containerProps={{ sx: { flex: 1 } }}
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
