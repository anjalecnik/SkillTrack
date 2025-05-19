import { FC, memo, useRef } from "react";
import { FieldName, useField, useInputControl } from "@conform-to/react";
import {
  TextField,
  TextFieldProps,
  useTheme,
  Typography,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Flex, FlexColumn, FlexProps } from "~/components/common";
import dayjs from "dayjs";
import { FieldTimeOutlined } from "@ant-design/icons";

export type TimeSelectProps = TextFieldProps & {
  name: FieldName<string>;
  containerProps?: FlexProps;
  dataTestId?: string;
  errorMessage?: string;
};

export const TimeSelectNotMemo: FC<TimeSelectProps> = ({
  name,
  containerProps,
  dataTestId,
  label,
  errorMessage,
  ...rest
}) => {
  const theme = useTheme();
  const [meta] = useField(name);
  const control = useInputControl(meta);
  const controlRef = useRef<HTMLInputElement>(null);

  return (
    <FlexColumn gap="8px" {...containerProps}>
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

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TextField
          {...rest}
          type="time"
          name={name}
          value={control.value}
          onChange={(a) => {
            control.change(a.target.value);
          }}
          inputRef={controlRef}
          slotProps={{
            input: {
              inputProps: {
                ["data-testid"]: dataTestId,
              },
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => controlRef.current?.showPicker()}>
                    <FieldTimeOutlined />
                  </IconButton>
                </InputAdornment>
              ),
              style: { paddingRight: 0 },
              onClick: () => {
                if (!control.value) {
                  control.change(dayjs().format("HH:mm"));
                }
              },
            },
          }}
        />
        {errorMessage && (
          <Typography
            data-testid={`${dataTestId}Error`}
            sx={{
              color: theme.palette.customColors.red.main,
            }}
          >
            {errorMessage}
          </Typography>
        )}
      </LocalizationProvider>
    </FlexColumn>
  );
};

export const TimeSelect = memo<TimeSelectProps>(TimeSelectNotMemo);
