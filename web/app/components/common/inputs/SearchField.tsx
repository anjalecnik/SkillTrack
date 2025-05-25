import { Form, useSearchParams } from "@remix-run/react";
import { IconButton, InputAdornment } from "@mui/material";
import { TextInput, TextInputProps } from "~/components/common";
import { useEffect, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useDebounce } from "~/hooks";
import { FormProvider, useForm } from "@conform-to/react";

interface SearchFieldProps extends Omit<TextInputProps, "onSubmit" | "name"> {
  param?: string;
  onSubmit?: () => void;
  delay?: number;
  name?: string;
}

export const SearchField = ({
  param,
  onSubmit,
  delay = 400,
  name = "search",
  ...rest
}: SearchFieldProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamValue = searchParams.get(param ?? "");
  const [searchValue, setSearchValue] = useState(searchParamValue ?? "");

  const debounceValue = useDebounce(searchValue, delay);

  const [form] = useForm({
    id: "search-form",
    defaultValue: {
      search: searchValue,
    },
  });

  useEffect(() => {
    if (param) {
      const modifiedParams = new URLSearchParams(searchParams);
      modifiedParams.set(param, searchValue);

      if (!searchValue) {
        modifiedParams.delete(param);
      }

      if (searchValue || debounceValue) {
        modifiedParams.set("page", "1");
      }

      setSearchParams(modifiedParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceValue]);

  const handleOnChange = (value: string) => {
    setSearchValue(value);
  };

  const handleOnSubmit = () => {
    onSubmit?.();

    if (param) {
      const modifiedParams = new URLSearchParams(searchParams);
      modifiedParams.set(param, searchValue as string);

      if (!searchValue) {
        modifiedParams.delete(param);
      }

      modifiedParams.set("page", "1");

      setSearchParams(modifiedParams, { replace: true });
    }
  };

  const handleClear = () => {
    setSearchValue("");
    const modifiedParams = new URLSearchParams(searchParams);
    modifiedParams.delete(param ?? "");
    setSearchParams(modifiedParams, { replace: true });
  };

  return (
    <Form id={form.id}>
      <FormProvider context={form.context}>
        <TextInput
          {...rest}
          dataTestId="searchInput"
          onEnterKeyPress={handleOnSubmit}
          onChange={handleOnChange}
          value={searchValue}
          name={name}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear"
                  onClick={handleClear}
                  sx={{ visibility: searchValue ? "visible" : "hidden" }}
                >
                  <CloseOutlined />
                </IconButton>
                <IconButton
                  aria-label="perform search"
                  onClick={handleOnSubmit}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormProvider>
    </Form>
  );
};
