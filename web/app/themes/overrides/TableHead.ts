import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function TableHead(
  theme: Theme
): ComponentOverrideType<"MuiTableHead"> {
  return {
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[50],
          border: "none",
        },
      },
    },
  };
}
