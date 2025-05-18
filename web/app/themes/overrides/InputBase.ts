import { ComponentOverrideType } from "../types";

export default function InputBase(): ComponentOverrideType<"MuiInputBase"> {
  return {
    MuiInputBase: {
      styleOverrides: {
        sizeSmall: {
          fontSize: "0.75rem",
        },
      },
    },
  };
}
