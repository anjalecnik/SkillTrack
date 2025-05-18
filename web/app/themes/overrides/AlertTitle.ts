import { ComponentOverrideType } from "../types";

export default function AlertTitle(): ComponentOverrideType<"MuiAlertTitle"> {
  return {
    MuiAlertTitle: {
      styleOverrides: {
        root: {
          marginBottom: 4,
          marginTop: 0,
          fontWeight: 400,
        },
      },
    },
  };
}
