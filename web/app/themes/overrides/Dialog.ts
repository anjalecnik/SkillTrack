import { alpha } from "@mui/material";
import { ComponentOverrideType } from "../types";

export default function Dialog(): ComponentOverrideType<"MuiDialog"> {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          "& .MuiBackdrop-root": {
            backgroundColor: alpha("#000", 0.7),
          },
        },
      },
    },
  };
}
