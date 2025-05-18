import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function DialogActions(
  theme: Theme
): ComponentOverrideType<"MuiDialogActions"> {
  return {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
          gap: `${theme.spacing(2)}`,
          "&>:not(:first-of-type)": {
            marginLeft: 0,
          },
        },
      },
    },
  };
}
