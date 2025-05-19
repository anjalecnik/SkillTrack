import { ComponentOverrideType } from "../types";

export default function LinearProgress(): ComponentOverrideType<"MuiLinearProgress"> {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 6,
          borderRadius: 100,
          backgroundColor: "#F5F5F5",
        },
        bar: {
          borderRadius: 100,
        },
      },
    },
  };
}
