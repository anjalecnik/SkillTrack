import {
  Autocomplete,
  createFilterOptions,
  Box,
  TextField,
  InputLabel,
  Popper,
  Typography,
  useTheme,
  PopperProps,
} from "@mui/material";
import { Flex, FlexColumn, FlexProps, FlagIcon } from "~/components/common";
import { Country, Locales } from "~/types";
import { useEffect, useState } from "react";
import { FieldName, unstable_useControl, useField } from "@conform-to/react";

export type LocaleVariants =
  | "countryName"
  | "countryCode"
  | "callingCode"
  | "localeCode"
  | "nationality";
export interface CountryInputProps {
  variant: LocaleVariants;
  returnValue?: LocaleVariants;
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  name: string;
  defaultValue?: Country | undefined;
  onChange?: (value: Country | null) => void;
}

export const CountryInput = ({
  variant,
  returnValue,
  containerProps,
  label,
  name,
  defaultValue,
  onChange,
  ...props
}: CountryInputProps) => {
  const theme = useTheme();
  const [value, setValue] = useState<Country | null>(defaultValue || null);
  const [meta] = useField(name as FieldName<string>);
  const inputControl = unstable_useControl(meta);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleInputChange = (
    event: React.SyntheticEvent,
    newValue: Country | null
  ) => {
    if (onChange) onChange(newValue);
    inputControl.change(
      returnValue ? mapReturnValue(newValue)! : mapOptionLabel(newValue)!
    );
    setValue(newValue);
  };

  const filterOptions = createFilterOptions({
    stringify: (option: Country) =>
      `${option.countryName} ${option.nationality} ${option.callingCode} ${option.countryCode} ${option.localeCode}`,
  });

  const mapReturnValue = (option: Country | null) => {
    if (!option) return "";
    switch (returnValue) {
      case "countryCode":
        return option.countryCode;
      case "callingCode":
        return "+" + option.callingCode;
      case "countryName":
        return option.countryName;
      case "localeCode":
        return option.localeCode;
      case "nationality":
        return option.nationality;
    }
  };

  const mapOptionLabel = (option: Country | null) => {
    if (!option) return "";
    if (variant === "callingCode") return "+" + option.callingCode.toString();
    if (variant === "localeCode") return option.localeCode;
    if (variant === "nationality") return option.nationality;
    if (variant === "countryCode") return option.countryCode;
    return option.countryName;
  };

  return (
    <FlexColumn gap="4px" {...containerProps}>
      {label && (
        <Flex gap="4px">
          {props.required && (
            <Typography
              sx={{
                color: theme.palette.customColors.red.main,
              }}
            >
              *
            </Typography>
          )}
          <InputLabel>{label}</InputLabel>
        </Flex>
      )}
      <input
        type="hidden"
        ref={inputControl.register}
        name={name}
        value={inputControl.value}
      />
      <Autocomplete
        autoHighlight
        options={Locales}
        onChange={handleInputChange}
        value={value}
        isOptionEqualToValue={(a, b) => a.localeCode === b.localeCode}
        filterOptions={filterOptions}
        PopperComponent={(props: PopperProps) => {
          return (
            <Popper
              {...props}
              placement="bottom-start"
              sx={{ width: "fit-content" }}
            >
              {props.children}
            </Popper>
          );
        }}
        getOptionLabel={mapOptionLabel}
        renderOption={(props, option) => {
          let text;
          switch (variant) {
            case "callingCode":
              text = `${option.countryName} +${option.callingCode}`;
              break;
            case "countryName":
              text = option.countryName;
              break;
            case "nationality":
              text = option.nationality;
              break;
            case "localeCode":
              text = option.localeCode;
              break;
            case "countryCode":
              text = option.countryCode;
              break;
            default:
              text = option.countryName;
              break;
          }

          return (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
              key={option.countryCode}
            >
              <FlagIcon
                countryCode={option.countryCode}
                lazyLoad
                width="20px"
              />
              {text}
            </Box>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-password", // Disable autocomplete and autofill
            }}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.placeholder}
            required={props.required}
            data-testid="companyCountryInput"
            autoComplete={
              variant === "callingCode" ? "tel-country-code" : "off"
            }
          />
        )}
        sx={{ flex: 1 }}
      />
    </FlexColumn>
  );
};
