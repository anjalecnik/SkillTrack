import { styled, TextFieldProps } from "@mui/material";
import {
  MultipleInputsContainer,
  CountryInput,
  TextInputProps,
} from "~/components/common";
import { TextInput } from "~/components/common/inputs/TextInput";
import { Country } from "~/types";

interface PhoneNumberInputProps extends Omit<TextFieldProps, "onChange"> {
  label?: string;
  placeholder?: string;
  numberName: string;
  countryCodeName: string;
  numberDefaultValue?: string;
  countryCodeDefaultValue?: Country;
  required?: boolean;
  onCountryChange?: (value: Country | null) => void;
  phoneNumberInputProps?: TextInputProps;
}

const StyledNumberInput = styled(TextInput)`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    display: none;
  }
`;

export const PhoneNumberInput = ({
  label,
  placeholder,
  numberName,
  countryCodeName,
  numberDefaultValue,
  countryCodeDefaultValue,
  required,
  onCountryChange,
  phoneNumberInputProps,
}: PhoneNumberInputProps) => {
  return (
    <MultipleInputsContainer label={label} required={required}>
      <CountryInput
        variant="callingCode"
        returnValue="callingCode"
        containerProps={{ width: "130px" }}
        name={countryCodeName}
        defaultValue={countryCodeDefaultValue}
        required={required}
        onChange={onCountryChange}
      />

      <StyledNumberInput
        {...phoneNumberInputProps}
        key={phoneNumberInputProps?.key}
        containerProps={{ flex: 1 }}
        type="number"
        placeholder={placeholder}
        name={numberName}
        defaultValue={numberDefaultValue}
        autoComplete="tel-national"
        required={required}
      />
    </MultipleInputsContainer>
  );
};
