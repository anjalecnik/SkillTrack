import { ComponentOverrideType } from "../types";

export default function Typography(): ComponentOverrideType<"MuiTypography"> {
  return {
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: 12,
        },
      },
    },
  };
}
