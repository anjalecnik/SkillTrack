import {
  IconButton,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
  Typography,
  SelectChangeEvent,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import { useState, MouseEvent, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { FieldName, useField, useInputControl } from "@conform-to/react";

export interface EnumSelectProps<T> extends MuiSelectProps<T> {
  containerProps?: FlexProps;
  labelFunction?: (value: T) => string;
  enumType: Record<string, T>;
  onChange?: (event: SelectChangeEvent<T>) => void;
  label?: string;
  value?: T;
  defaultValue?: T;
  name: string;
  disabled?: boolean;
  required?: boolean;
  dataTestId?: string;
}

export const EnumSelect = <T,>(props: EnumSelectProps<T>) => {
  const {
    label,
    containerProps,
    enumType,
    labelFunction,
    defaultValue,
    value,
    name,
    onChange,
    dataTestId,
    ...rest
  } = props;
  const theme = useTheme();
  const [selectedValue, setValue] = useState<T | string>(
    defaultValue ?? value ?? ""
  );

  useEffect(() => {
    if (value) {
      setValue(value);
    } else if (defaultValue) {
      setValue(defaultValue);
    }
  }, [value, defaultValue]);

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setValue("");
  };

  const [meta] = useField(name as FieldName<string>);
  const inputControl = useInputControl(meta);

  return (
    <FlexColumn gap="8px" style={{ overflow: "hidden" }} {...containerProps}>
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
      <MuiSelect
        value={selectedValue}
        {...rest}
        onChange={(e) => {
          setValue(e.target.value as T);
          onChange?.(e as SelectChangeEvent<T>);
          inputControl.change(e.target.value as string);
        }}
        data-testId={dataTestId}
        IconComponent={
          !rest.required && selectedValue
            ? () => (
                <IconButton
                  onClick={(e) => {
                    handleClear(e);
                    setTimeout(() => {
                      inputControl.change("");
                    }, 0);
                  }}
                >
                  <CloseOutlined />
                </IconButton>
              )
            : undefined
        }
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        renderValue={(value) =>
          labelFunction ? labelFunction(value as T) : (value as React.ReactNode)
        }
      >
        {Object.entries(enumType).map(([key, enumValue]) => (
          <MenuItem key={key} value={enumValue as string}>
            {labelFunction ? labelFunction(enumValue) : (enumValue as string)}
          </MenuItem>
        ))}
      </MuiSelect>
    </FlexColumn>
  );
};
