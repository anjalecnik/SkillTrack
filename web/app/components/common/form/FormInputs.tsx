import { getInputProps, getSelectProps, useField } from "@conform-to/react";
import {
  Autocomplete,
  AutocompleteProps,
  CountryInput,
  CountryInputProps,
  DateInput,
  DateInputProps,
  EnumSelect,
  EnumSelectProps,
  GenericSelectProps,
  LocaleVariants,
  PhoneNumberInput,
  SelectWithChips,
  TextInput,
  TextInputProps,
  TimeSelect,
  TimeSelectProps,
} from "../inputs";
import { t } from "i18next";
import { Locales } from "~/types";
import { AddItemButton, IAddItemButtonProps, RemoveButton } from "../buttons";
import { FormContext } from "~/util";
import { ElementType, ReactElement, ReactNode, useContext } from "react";
import { useIsFieldRequired } from "~/hooks/useIsFieldRequired";
import { Dayjs } from "dayjs";
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  Typography,
  useTheme,
} from "@mui/material";

interface IFormTextInputProps extends TextInputProps {
  fieldName: string;
  defaultValue?: string | number;
  dataTestid?: string;
}

export const FormTextInput = ({
  fieldName,
  defaultValue,
  ...rest
}: IFormTextInputProps) => {
  const [field] = useField(fieldName);
  const required = useIsFieldRequired(fieldName);
  const { key, ...inputProps } = getInputProps(field, {
    type: "text",
  });
  return (
    <TextInput
      key={key}
      {...inputProps}
      error={!!field.errors}
      errorMessage={t(field.errors?.[0] ?? "")}
      defaultValue={defaultValue}
      required={required}
      {...rest}
    />
  );
};
FormTextInput.displayName = "FormTextInput";

interface IFormPhoneNumberInputProps
  extends Omit<
    PhoneNumberInputProps,
    "countryCodeDefaultValue" | "numberName" | "countryCodeName"
  > {
  numberFieldName: string;
  countryCodeFieldName: string;
  countryCodeDefaultValue: string | undefined;
}

export const FormPhoneNumberInput = ({
  numberFieldName,
  countryCodeFieldName,
  countryCodeDefaultValue,
  ...rest
}: IFormPhoneNumberInputProps) => {
  const [numberField] = useField(numberFieldName);
  const required = useIsFieldRequired(numberFieldName);
  return (
    <PhoneNumberInput
      numberName={numberFieldName}
      numberDefaultValue={numberField.value as string}
      countryCodeName={countryCodeFieldName}
      countryCodeDefaultValue={Locales.find(
        (locale) => locale.callingCode === countryCodeDefaultValue?.substring(1)
      )}
      phoneNumberInputProps={getInputProps(numberField, {
        type: "number",
      })}
      required={required}
      {...rest}
    />
  );
};
FormPhoneNumberInput.displayName = "FormPhoneNumberInput";

interface IFormCountryInputProps
  extends Omit<CountryInputProps, "variant" | "defaultValue" | "name"> {
  fieldName: string;
  defaultValue?: string;
  returnValue?: LocaleVariants;
  variant?: LocaleVariants;
}

export const FormCountryInput = ({
  fieldName,
  defaultValue,
  variant = "countryName",
  returnValue = "countryCode",
  ...rest
}: IFormCountryInputProps) => {
  const required = useIsFieldRequired(fieldName);
  return (
    <CountryInput
      variant={variant}
      returnValue={returnValue}
      defaultValue={Locales.find(
        (locale) => locale[returnValue] === defaultValue
      )}
      name={fieldName}
      required={required}
      {...rest}
    />
  );
};
FormCountryInput.displayName = "FormCountryInput";
interface IFormRemoveButtonProps {
  fieldName: string;
  index: number;
  ButtonComponent?: ElementType;
  children?: ReactNode;
}

export const FormRemoveButton = ({
  fieldName,
  index,
  children,
  ButtonComponent = RemoveButton,
  ...rest
}: IFormRemoveButtonProps) => {
  const { form } = useContext(FormContext);
  return (
    form && (
      <ButtonComponent
        {...form.remove.getButtonProps({
          name: fieldName,
          index,
        })}
        {...rest}
      >
        {children}
      </ButtonComponent>
    )
  );
};
FormRemoveButton.displayName = "FormRemoveButton";
interface IFormAddButtonProps extends IAddItemButtonProps {
  fieldName: string;
}

export const FormAddButton = ({
  fieldName,
  children,
  ...rest
}: IFormAddButtonProps) => {
  const { form } = useContext(FormContext);
  return (
    form && (
      <AddItemButton
        {...form.insert.getButtonProps({
          name: fieldName,
        })}
        {...rest}
      >
        {children}
      </AddItemButton>
    )
  );
};
FormAddButton.displayName = "FormAddButton";
interface IFormHiddenInputProps {
  fieldName: string;
  defaultValue?: string | number;
}

export const FormHiddenInput = ({
  fieldName,
  defaultValue,
}: IFormHiddenInputProps) => {
  return (
    <input
      type="hidden"
      name={fieldName ?? undefined}
      defaultValue={defaultValue}
    />
  );
};
FormHiddenInput.displayName = "FormHiddenInput";

interface IFormAutocompleteInputProps<T extends { id: number | string }>
  extends AutocompleteProps<T> {
  fieldName: string;
  defaultValue: T;
}

export function FormAutocompleteInput<T extends { id: number | string }>({
  fieldName,
  defaultValue,
  options,
  ...rest
}: Omit<IFormAutocompleteInputProps<T>, "name">) {
  const [field] = useField(fieldName);

  return (
    <Autocomplete<T>
      {...getSelectProps(field)}
      key={field.key}
      name={field.name}
      value={defaultValue}
      options={options}
      {...rest}
    />
  );
}
FormAutocompleteInput.displayName = "FormAutocompleteInput";

interface IFormSelectWithChipsProps<T>
  extends Omit<GenericSelectProps<T>, "defaultValue" | "name"> {
  fieldName: string;
  defaultValue: string;
}
export function FormSelectWithChips<T>({
  fieldName,
  defaultValue,
  ...rest
}: IFormSelectWithChipsProps<T>) {
  return (
    <SelectWithChips
      defaultValue={(JSON.parse(defaultValue) as T[]) ?? []}
      {...rest}
      name={fieldName}
    />
  );
}
FormSelectWithChips.displayName = "FormSelectWithChips";

interface IFormEnumSelectProps<T> extends Omit<EnumSelectProps<T>, "name"> {
  fieldName: string;
}

export function FormEnumSelect<T>({
  fieldName,
  defaultValue,
  ...rest
}: IFormEnumSelectProps<T>) {
  const [field] = useField(fieldName);
  const { key, ...inputProps } = { ...getSelectProps(field) };
  return (
    <EnumSelect<T>
      key={key}
      {...inputProps}
      defaultValue={defaultValue as T}
      label={t("workspaceEmployees.gender")}
      {...rest}
    />
  );
}
FormEnumSelect.displayName = "FormEnumSelect";

interface IFormTimeSelect
  extends Omit<TimeSelectProps, "defaultValue" | "name"> {
  fieldName: string;
  defaultValue: Dayjs | undefined;
}

export function FormTimeSelect({
  fieldName,
  defaultValue,
  ...rest
}: IFormTimeSelect) {
  return (
    <TimeSelect
      label={t("workspaceSettings.at")}
      ampm={false}
      format="HH:mm"
      {...rest}
      value={defaultValue}
      name={fieldName}
    />
  );
}
FormTimeSelect.displayName = "FormTimeSelect";

interface IFormDateInput extends Omit<DateInputProps, "defaultValue" | "name"> {
  fieldName: string;
  defaultValue?: Dayjs | undefined | null;
  format: string;
}

export function FormDateInput({
  fieldName,
  defaultValue,
  format,
  ...rest
}: IFormDateInput) {
  const { fieldErrors, setFieldErrors } = useContext(FormContext);

  return (
    <DateInput
      format={format}
      name={fieldName}
      onError={(error) => {
        if (fieldName) {
          const updatedErrors = {
            ...fieldErrors,
            [fieldName]: error as string,
          };
          setFieldErrors(updatedErrors);
        }
      }}
      {...rest}
      value={defaultValue}
    />
  );
}
FormDateInput.displayName = "FormDateInput";

interface IFormArray<T> {
  fieldName: string;
  defaultValue?: T[];
  render: (fields: T | undefined, index: number) => ReactElement;
}

export function FormArray<T>({ fieldName, render }: IFormArray<T>) {
  const [field] = useField(fieldName);
  const array = field.getFieldList();

  return (
    <>
      {array &&
        array.map((item, index: number) => {
          return render(item.value as T, index);
        })}
    </>
  );
}
FormArray.displayName = "FormArray";

interface IFormError {
  fieldName: string;
}

export function FormError({ fieldName }: IFormError) {
  const theme = useTheme();
  const [errorField] = useField(fieldName);
  return (
    <Typography
      sx={{
        color: theme.palette.customColors.red.main,
      }}
    >
      {t(errorField.errors?.[0] ?? "")}
    </Typography>
  );
}
FormError.displayName = "FormError";

interface IFormCheckbox
  extends Omit<FormControlLabelProps, "control" | "defaultValue"> {
  fieldName: string;
  defaultValue?: boolean | undefined;
}

export function FormCheckbox({
  fieldName,
  defaultValue,
  ...rest
}: IFormCheckbox) {
  const [field] = useField(fieldName);
  return (
    <FormControlLabel
      {...getInputProps(field, {
        type: "checkbox",
      })}
      key={field.key}
      control={<Checkbox defaultChecked={defaultValue} />}
      {...rest}
    />
  );
}
FormCheckbox.displayName = "FormCheckbox";
