import { useCallback, useEffect, useState } from "react";
import {
  Checkbox,
  Chip,
  InputLabel,
  Popper,
  Typography,
  useTheme,
  Autocomplete,
  createFilterOptions,
  Box,
  TextField,
} from "@mui/material";
import { CloseSquareOutlined } from "@ant-design/icons";
import {
  Flex,
  FlexColumn,
  FlexProps,
  Avatar,
  Button,
} from "~/components/common";
import { useTranslation } from "react-i18next";
import { FieldName, useField, useInputControl } from "@conform-to/react";
import { PopperProps } from "@mui/material/Popper";

export interface GenericSelectProps<T> {
  defaultValue: T[];
  options: T[];
  name: FieldName<string | number>;
  dataTestId?: string;
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  containerProps?: FlexProps;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  avatarImageSrc?: (option: T) => string;
  avatarImage?: (option: T) => string;
  labelExtractor: (option: T) => string;
  valueExtractor: (option: T) => number;
  onChange?: (value: T[]) => void;
}

export function SelectWithChips<T>({
  containerProps,
  label,
  defaultValue,
  dataTestId,
  onChange,
  options,
  multiple,
  name,
  avatarImageSrc,
  avatarImage,
  labelExtractor,
  valueExtractor,
  ...rest
}: GenericSelectProps<T>) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<T[]>(defaultValue);
  const [meta] = useField(name);
  const control = useInputControl(meta);

  if (defaultValue && !selectedItems) {
    setSelectedItems(defaultValue);
  }

  const filterOptions = createFilterOptions({
    stringify: (option: T) =>
      `${labelExtractor(option)} ${valueExtractor(option)}`,
  });

  const handleChange = (event: React.SyntheticEvent, value: T[]) => {
    setSelectedItems(value);
    onChange && onChange(value);
    control.change(JSON.stringify(value));
  };

  useEffect(() => {
    control.change(JSON.stringify(selectedItems));
  }, [selectedItems, control]);

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
      <input type="hidden" name={name} value={JSON.stringify(selectedItems)} />
      <FlexColumn gap="20px">
        <Autocomplete
          data-testid={dataTestId}
          multiple
          autoHighlight
          fullWidth
          disableCloseOnSelect={multiple}
          options={options}
          value={selectedItems}
          isOptionEqualToValue={(a, b) =>
            valueExtractor(a) === valueExtractor(b)
          }
          getOptionLabel={(option) => labelExtractor(option)}
          filterOptions={filterOptions}
          onChange={handleChange}
          PopperComponent={useCallback(
            (props: PopperProps) => (
              <Popper
                {...props}
                placement="bottom-start"
                sx={{
                  width: "fit-content",
                  bgcolor: `${theme.palette.background.paper} !important`,
                }}
              >
                {props.children}
              </Popper>
            ),
            [theme.palette.background.paper]
          )}
          renderOption={(props, option: T, { selected, index }) => (
            <>
              {index === 0 && (
                <>
                  <Flex gap="10px" marginLeft="12px">
                    {selectedItems.map((option: T, index: number) => (
                      <Chip
                        key={index}
                        size="medium"
                        sx={{
                          margin: "2px",
                          padding: "6px",
                          minHeight: "32px",
                        }}
                        label={`${labelExtractor(option)}`}
                        avatar={
                          avatarImage ? (
                            <Avatar
                              avatarId={valueExtractor(option)}
                              name={labelExtractor(option)}
                              size="20px"
                              fontSize="12px"
                            />
                          ) : avatarImageSrc ? (
                            <Avatar
                              src={avatarImageSrc(option)}
                              size="20px"
                              fontSize="12px"
                            />
                          ) : undefined
                        }
                        onDelete={() => {
                          const newSelected = [...selectedItems];
                          newSelected.splice(index, 1);
                          setSelectedItems(newSelected);
                          onChange && onChange(newSelected);
                        }}
                        deleteIcon={
                          <CloseSquareOutlined style={{ fontSize: "15px" }} />
                        }
                      />
                    ))}
                  </Flex>
                  <Button
                    variant="text"
                    style={{
                      backgroundColor: "transparent",
                      padding: "0px",
                      minHeight: "0px",
                      marginLeft: "12px",
                      marginTop: "10px",
                    }}
                    onClick={() => setSelectedItems([])}
                  >
                    {t("common.clearAll")}
                  </Button>
                </>
              )}
              <Box
                component="li"
                sx={{
                  gap: "8px",
                  bgcolor: `${theme.palette.background.paper} !important`,
                  paddingX: "0",
                  paddingY: "0",
                  marginTop: "0",
                  width: "auto",
                  paddingLeft: "0px",
                }}
                {...props}
                key={valueExtractor(option)}
              >
                <Checkbox style={{ marginRight: 0 }} checked={selected} />
                {avatarImage ? (
                  <Avatar
                    avatarId={valueExtractor(option)}
                    name={labelExtractor(option)}
                    size="20px"
                    fontSize="12px"
                  />
                ) : avatarImageSrc ? (
                  <Avatar
                    src={avatarImageSrc(option)}
                    size="20px"
                    fontSize="12px"
                  />
                ) : undefined}
                <Typography noWrap>{labelExtractor(option)}</Typography>
              </Box>
            </>
          )}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option: T, index) => (
              <Chip
                {...getTagProps({ index })}
                key={index}
                sx={{ padding: "4px", display: "none" }}
                size="medium"
                variant="filled"
                color="default"
                label={`${labelExtractor(option)} ${valueExtractor(option)}`}
                deleteIcon={<CloseSquareOutlined style={{ fontSize: "7px" }} />}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              error={rest.error}
              helperText={rest.helperText}
              required={rest.required}
              placeholder={rest.placeholder!}
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: "new-password", // Disable autocomplete and autofill
                },
              }}
            />
          )}
          sx={{ flex: 1 }}
        />
        <Flex
          gap="10px"
          sx={{
            flexWrap: "wrap",
          }}
        >
          {selectedItems.map((option: T, index: number) => (
            <Chip
              key={index}
              size="medium"
              sx={{
                margin: "2px",
                padding: "6px",
                minHeight: "32px",
              }}
              label={
                <Typography noWrap sx={{ maxWidth: "370px" }}>
                  {labelExtractor(option)}
                </Typography>
              }
              avatar={
                avatarImage ? (
                  <Avatar
                    avatarId={valueExtractor(option)}
                    name={labelExtractor(option)}
                    size="20px"
                    fontSize="12px"
                  />
                ) : avatarImageSrc ? (
                  <Avatar
                    src={avatarImageSrc(option)}
                    size="20px"
                    fontSize="12px"
                  />
                ) : undefined
              }
              onDelete={() => {
                const newSelected = selectedItems.filter((_, i) => i !== index);
                setSelectedItems(newSelected);
                onChange?.(newSelected);
              }}
              deleteIcon={<CloseSquareOutlined style={{ fontSize: "15px" }} />}
            />
          ))}
        </Flex>
      </FlexColumn>
    </FlexColumn>
  );
}
