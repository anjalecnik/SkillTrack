import { useEffect, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CloseCircleOutlined,
  FilterFilled,
} from "@ant-design/icons";
import {
  Checkbox,
  Chip,
  FormControlLabel,
  Popover,
  styled,
  SxProps,
  TableCell,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Flex, FlexColumn } from "~/components/common";
import { Theme } from "@emotion/react";

interface TableSortProps {
  isSorted?: boolean;
  isSortedDesc?: boolean;
  onClick: () => void;
}

export const TableSort = ({
  isSorted,
  isSortedDesc,
  onClick,
}: TableSortProps) => {
  const theme = useTheme();
  return (
    <FlexColumn
      sx={{ color: "secondary.light", cursor: "pointer" }}
      onClick={() => onClick()}
      justifyContent="center"
      alignItems="center"
    >
      <CaretUpOutlined
        style={{
          fontSize: "0.625rem",
          color:
            isSorted && !isSortedDesc
              ? theme.palette.text.secondary
              : "inherit",
        }}
      />
      <CaretDownOutlined
        style={{
          fontSize: "0.625rem",
          marginTop: -2,
          color: isSortedDesc ? theme.palette.text.secondary : "inherit",
        }}
      />
    </FlexColumn>
  );
};

const FilterTextField = styled(TextField)`
  .MuiInput-root:after {
    border: 1px solid ${({ theme }) => theme.palette.divider};
  }
`;

type SortDirection = "asc" | "desc";

export interface TableFilterProps {
  param: string;
  options: { label: string; value: string; checked?: boolean }[];
  multiple: boolean;
}

export const TableFilter = ({ param, options }: TableFilterProps) => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [searchStr, setSearchStr] = useState("");
  const [checkedOptions, setCheckedOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const filteredOptions = options
    .filter(
      (option) =>
        option.label.toLowerCase().includes(searchStr.toLowerCase()) ||
        option.value.toLowerCase().includes(searchStr.toLowerCase())
    )
    .map((option) => ({
      ...option,
      checked: checkedOptions.some((co) => co.value === option.value),
    }));

  const handleOptionClick = (optionValue: string, value: boolean) => {
    const option = options.find((o) => o.value === optionValue);
    if (option) {
      option.checked = value;
      const filteredValues = searchParams.get(param)?.split(",") || [];
      if (!value) {
        const ind = filteredValues.indexOf(optionValue);
        if (ind > -1) {
          filteredValues.splice(ind, 1);
        }
      } else {
        filteredValues.push(optionValue);
      }
      if (!filteredValues.length) {
        searchParams.delete(param);
      } else {
        searchParams.set(param, filteredValues.join(","));
      }
      setSearchParams(searchParams, { replace: true });
    }
  };

  const handleClearFilters = () => {
    for (const option of options) {
      option.checked = false;
    }
    searchParams.delete(param);
    setSearchParams(searchParams, { replace: true });
  };

  useEffect(() => {
    const filteredValues = searchParams.get(param)?.split(",");
    const updatedOptions = options.map((option) => ({
      ...option,
      checked: filteredValues?.includes(option.value),
    }));

    setCheckedOptions(updatedOptions.filter((o) => o.checked));
  }, [searchParams, param, options]);

  return (
    <FlexColumn
      sx={{ color: "secondary.light", cursor: "pointer" }}
      justifyContent="center"
      alignItems="center"
    >
      <div
        aria-describedby={`filter-${param}`}
        aria-hidden="true"
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          setAnchorEl(e.currentTarget)
        }
      >
        <FilterFilled
          style={{
            fontSize: "0.625rem",
            color: searchParams.get(param)
              ? theme.palette.text.secondary
              : "inherit",
          }}
        />
      </div>
      <Popover
        id={`filter-${param}`}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <FlexColumn paddingX="12px" paddingY="16px" width="240px">
          <FilterTextField
            label="Filter by"
            variant="standard"
            placeholder="Search filters"
            value={searchStr}
            onChange={(event) => setSearchStr(event.target.value)}
            focused
            sx={{ mb: 1.25 }}
          />
          <FlexColumn alignItems="start" gap="10px" paddingX="6px">
            <Flex columnGap="8px" rowGap="4px" wrap="wrap">
              {checkedOptions.map((co) => (
                <Chip
                  key={`${co.value}-tag`}
                  size="small"
                  variant="outlined"
                  label={co.label}
                  onDelete={() => handleOptionClick(co.value, false)}
                  deleteIcon={<CloseCircleOutlined />}
                />
              ))}
            </Flex>
            {checkedOptions.length ? (
              <Typography
                onClick={handleClearFilters}
                sx={{
                  color: "primary",
                  cursor: "pointer",
                  mb: 1,
                }}
              >
                Clear filters
              </Typography>
            ) : (
              <></>
            )}
          </FlexColumn>
          <FlexColumn paddingX="12px">
            {filteredOptions.map((option) => (
              <FormControlLabel
                key={`filter-${option.value}`}
                control={
                  <Checkbox
                    checked={option.checked || false}
                    onChange={(e) =>
                      handleOptionClick(option.value, e.target.checked)
                    }
                  />
                }
                label={option.label}
              />
            ))}
          </FlexColumn>
        </FlexColumn>
      </Popover>
    </FlexColumn>
  );
};

export interface TableHeadCellProps {
  param?: string;
  sort?: boolean;
  sortKey?: string;
  width?: string;
  children?: React.ReactNode;
  filter?: TableFilterProps;
  sx?: SxProps<Theme>;
}

export const TableHeadCell = ({
  param,
  width,
  children,
  filter,
  sort,
  sortKey,
  sx,
}: TableHeadCellProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(false);
  const [direction, setDirection] = useState<null | SortDirection>(null);

  const toggle = () => {
    let dir: null | SortDirection = null;
    let ac = false;

    if (!active) {
      ac = true;
      dir = "asc";
    } else {
      if (direction === "asc") {
        ac = true;
        dir = "desc";
      } else {
        ac = false;
      }
    }

    setDirection(dir);
    setActive(ac);
    const modifiedParams = new URLSearchParams(searchParams);

    if (ac) {
      modifiedParams.set(sortKey ?? "sort", `${param ?? ""}:${dir ?? "asc"}`);
    } else {
      modifiedParams.delete(sortKey ?? "sort");
    }

    setSearchParams(modifiedParams, { replace: true });
  };

  useEffect(() => {
    const query = searchParams.get(sortKey ?? "sort");

    if (!query) return;

    const [field, direction] = query.split(":");

    setActive(field === param);
    setDirection(active ? (direction as SortDirection) : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, param]);

  return (
    <TableCell sx={sx} width={width}>
      <Flex alignContent="center" justifyContent="space-between">
        <Flex gap="10px" alignItems="center">
          {children}
          {param && sort && (
            <TableSort
              onClick={toggle}
              isSortedDesc={direction === "desc"}
              isSorted={active}
            />
          )}
        </Flex>
        {param && filter && <TableFilter {...filter} />}
      </Flex>
    </TableCell>
  );
};
