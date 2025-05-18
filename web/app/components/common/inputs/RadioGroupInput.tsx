import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { FlexColumn, Flex, FlexProps } from "../containers";
import { useEffect, useState } from "react";
import { FieldName, useField, useInputControl } from "@conform-to/react";
import { RATING_SCALE } from "~/constants";

interface IRadioGroupInputProps {
  containerProps?: FlexProps;
  options: { label: string; value: number | boolean }[];
  label: string;
  value: number | boolean | null;
  name: string;
  ratingScale?: boolean;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  dataTestId?: string;
  onChange?: (value: number | boolean) => void;
}

export const RadioGroupInput = (props: IRadioGroupInputProps) => {
  const {
    options,
    value: defaultValue,
    label,
    containerProps,
    ratingScale,
    dataTestId,
    onChange,
    ...rest
  } = props;

  const theme = useTheme();
  const [value, setValue] = useState<number | boolean | null>(defaultValue);

  const [meta] = useField(rest.name as FieldName<string>);
  const control = useInputControl(meta);

  useEffect(() => setValue(defaultValue), [defaultValue]);

  return (
    <FlexColumn
      width="100%"
      gap="8px"
      paddingLeft="3px"
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
      <Flex
        justifyContent="space-between"
        alignItems="center"
        gap="10px"
        paddingLeft="8px"
        width="100%"
        sx={(theme) => ({
          flexWrap: "nowrap",
          flexDirection: "row",
          [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignItems: "flex-start",
          },
        })}
      >
        {ratingScale && (
          <InputLabel
            sx={{
              whiteSpace: "nowrap",
              wordBreak: "normal",
              display: "flex",
              alignItems: "center",
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            }}
          >
            {RATING_SCALE[0]}
          </InputLabel>
        )}
        <RadioGroup
          data-testId={dataTestId}
          sx={(theme) => ({
            flexDirection: "row",
            overflow: "visible",
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
            [theme.breakpoints.down("sm")]: {
              flexDirection: "column",
              alignItems: "flex-start",
            },
          })}
          value={value}
          onChange={(_e, val) => {
            const newValue =
              val === "true" || val === "false" ? val === "true" : Number(val);
            setValue(newValue);
            onChange?.(newValue);
            control.change(newValue.toString());
          }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio required />}
              label={
                <Flex alignItems="center">
                  {(!ratingScale && option.label) ||
                    (ratingScale && theme.breakpoints.up("sm") && option.label)}
                  {ratingScale && (
                    <Typography
                      sx={(theme) => ({
                        display: "block",
                        [theme.breakpoints.up("sm")]: {
                          display: "none",
                        },
                      })}
                    >
                      - {RATING_SCALE[Number(option.label) - 1]}
                    </Typography>
                  )}
                </Flex>
              }
              disabled={rest.disabled}
              sx={{
                "& .MuiFormControlLabel-asterisk": {
                  display: "none",
                },
              }}
            />
          ))}
        </RadioGroup>
        {ratingScale && (
          <InputLabel
            sx={(theme) => ({
              whiteSpace: "nowrap",
              wordBreak: "normal",
              display: "flex",
              alignItems: "center",
              [theme.breakpoints.down("sm")]: {
                display: "none",
              },
            })}
          >
            {RATING_SCALE.at(-1)}
          </InputLabel>
        )}
      </Flex>
    </FlexColumn>
  );
};
