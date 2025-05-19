import { Theme } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function AccordionDetails(
  theme: Theme
): ComponentOverrideType<"MuiAccordionDetails"> {
  return {
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2),
          borderTop: `1px solid ${theme.palette.secondary.light}`,
        },
      },
    },
  };
}
