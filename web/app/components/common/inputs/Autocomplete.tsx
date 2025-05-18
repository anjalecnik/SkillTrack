import {
  InputLabel,
  Autocomplete as MuiAutocomplete,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import { SyntheticEvent, useEffect, useState } from "react";
import { FieldName, useField, useInputControl } from "@conform-to/react";

export interface AutocompleteProps<T extends { id: number | string }> {
  containerProps?: FlexProps;
  options: T[];
  label: string;
  value?: T | null;
  name: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: unknown, value?: number) => void;
  onClear?: () => void;
  getOptionLabel: (option?: T) => string;
}

export const Autocomplete = <T extends { id: number | string }>(
  props: AutocompleteProps<T>
) => {
  const {
    options,
    value: defaultValue,
    label,
    errorMessage,
    containerProps,
    getOptionLabel,
    onClear,
    onChange,
    ...rest
  } = props;
  const theme = useTheme();
  const [value, setValue] = useState<T | undefined | null>(defaultValue);
  const handleClear = (e: SyntheticEvent) => {
    e?.stopPropagation();
    onClear?.();
    setValue(null);
  };

  const [meta] = useField(rest.name as FieldName<string>);
  const control = useInputControl(meta);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <FlexColumn
      width="100%"
      gap="8px"
      style={{ overflow: "hidden" }}
      {...containerProps}
    >
      {label && (
        <Flex gap="4px">
          {rest.required && (
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
      <Flex alignItems="center">
        <input type="hidden" name={rest.name} value={value?.id ?? ""} />
        <MuiAutocomplete
          fullWidth
          disabled={rest.disabled}
          onChange={(e, newValue) => {
            setValue(newValue);
            onChange?.(e, newValue?.id as number);
            control.change(newValue?.id.toString());
          }}
          options={[...options]}
          isOptionEqualToValue={(o, v) => o?.id === v?.id}
          value={value}
          getOptionLabel={getOptionLabel}
          renderInput={(params) => (
            <TextField
              {...params}
              required={rest.required}
              error={rest.error}
              sx={{ textOverflow: "ellipsis" }}
            />
          )}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option.id}>
                <Typography noWrap>{getOptionLabel(option)}</Typography>
              </li>
            );
          }}
          onInputChange={(e, _, reason) => {
            if (reason === "clear") {
              handleClear(e);
              return;
            }
          }}
          disableClearable={!value || rest.required}
          {...rest}
        />
      </Flex>
      {errorMessage && (
        <Typography
          sx={{
            color: theme.palette.customColors.red.main,
          }}
        >
          {errorMessage}
        </Typography>
      )}
    </FlexColumn>
  );
};
