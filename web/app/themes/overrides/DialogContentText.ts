import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function DialogContentText(
  theme: Theme
): ComponentOverrideType<"MuiDialogContentText"> {
  return {
    MuiDialogContentText: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
