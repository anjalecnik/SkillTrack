import { ComponentOverrideType } from "../types";

export default function CardContent(): ComponentOverrideType<"MuiCardContent"> {
  return {
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 20,
          "&:last-child": {
            paddingBottom: 20,
          },
        },
      },
    },
  };
}
