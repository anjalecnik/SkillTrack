import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function TableBody(
  theme: Theme
): ComponentOverrideType<"MuiTableBody"> {
  const hoverStyle = {
    "&:hover": {
      backgroundColor: theme.palette.secondary.lighter,
    },
  };

  return {
    MuiTableBody: {
      styleOverrides: {
        root: {
          "&.striped .MuiTableRow-root": {
            "&:nth-of-type(even)": {
              backgroundColor: theme.palette.grey[50],
            },
            ...hoverStyle,
          },
          "& .MuiTableRow-root": {
            ...hoverStyle,
          },
        },
      },
    },
  };
}
