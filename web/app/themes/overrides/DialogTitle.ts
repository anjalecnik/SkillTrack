import { ComponentOverrideType } from "../types";

export default function DialogTitle(): ComponentOverrideType<"MuiDialogTitle"> {
  return {
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "16px",
          lineHeight: "24px",
          fontWeight: 700,
        },
      },
    },
  };
}
