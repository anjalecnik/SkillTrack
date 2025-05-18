import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function TableCell(
  theme: Theme
): ComponentOverrideType<"MuiTableCell"> {
  const commonCell = {
    "&:not(:last-of-type)": {
      position: "relative",
      "&:after": {
        position: "absolute",
        content: '""',
        backgroundColor: theme.palette.divider,
        width: 1,
        height: "calc(100% - 30px)",
        right: 0,
        top: 16,
      },
    },
  };

  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 400,
          padding: "24px 10px !important",
          borderColor: theme.palette.divider,
        },
        sizeSmall: {
          padding: 8,
        },
        head: {
          fontSize: "14px",
          lineHeight: "22px",
          fontWeight: 500,
          ...commonCell,
        },
        body: {
          wordBreak: "break-word",
          textWrap: "wrap",
          whiteSpace: "normal",
        },
        footer: {
          fontSize: "0.75rem",
          textTransform: "uppercase",
          ...commonCell,
        },
      },
    },
  };
}
