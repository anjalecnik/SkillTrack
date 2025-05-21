import {
  InputLabel,
  TextField,
  type TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import { ReactNode } from "react";
import { FieldName, useField, useInputControl } from "@conform-to/react";

export interface TextInputProps extends Omit<TextFieldProps, "onChange"> {
  dataTestId?: string;
  onChange?: (value: string) => void;
  onEnterKeyPress?: () => void;
  containerProps?: FlexProps;
  name: FieldName<string>;
  /** Also requires maxLength prop to be set */
  showLength?: boolean;
  maxLength?: number;
  secondaryLabel?: string;
  errorMessage?: ReactNode;
  length?: number;
  readonly?: boolean;
  fullWidth?: boolean;
}

export const TextInput = (props: TextInputProps) => {
  const {
    dataTestId,
    label,
    name,
    onChange,
    onEnterKeyPress,
    containerProps,
    showLength,
    maxLength,
    secondaryLabel,
    errorMessage,
    length,
    readonly,
    fullWidth,
    ...rest
  } = props;
  const theme = useTheme();
  const [meta] = useField(name);
  const control = useInputControl(meta);

  return (
    <FlexColumn
      gap="8px"
      sx={{
        width: fullWidth ? "100%" : null,
        ...(containerProps?.sx || {}),
      }}
      {...containerProps}
    >
      {label && (
        <Flex gap="4px">
          {rest.required && (
            <Typography
              sx={{
                height: "0px",
                color:
                  theme.palette.customColors &&
                  theme.palette.customColors.red.main,
              }}
            >
              *
            </Typography>
          )}
          <InputLabel>{label}</InputLabel>
        </Flex>
      )}
      <TextField
        {...rest}
        value={control.value}
        onChange={(e) => {
          onChange ? onChange(e.target.value) : control.change(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterKeyPress?.();
          }
        }}
        sx={{
          "& input": {
            textOverflow: "ellipsis",
          },

          "& input:disabled": {
            backgroundColor: "#f0f0f0",
          },

          "& input:read-only": {
            backgroundColor: "#f0f0f0",
            color: "rgba(0, 0, 0, 0.6)",
          },
        }}
        slotProps={{
          input: {
            inputProps: {
              "data-testid": dataTestId,
              ...(readonly ? { readOnly: true } : {}),
            },
          },
        }}
      />
      {showLength && maxLength && (
        <Flex width="100%" justifyContent="end">
          <Typography
            sx={{
              color: "GrayText",
            }}
          >{`${length ?? 0}/${maxLength}`}</Typography>
        </Flex>
      )}
      {secondaryLabel && <InputLabel>{secondaryLabel}</InputLabel>}
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
