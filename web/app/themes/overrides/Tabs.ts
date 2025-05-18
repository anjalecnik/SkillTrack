import { ComponentOverrideType } from "../types";

export default function Tabs(): ComponentOverrideType<"MuiTabs"> {
  return {
    MuiTabs: {
      styleOverrides: {
        vertical: {
          overflow: "visible",
        },
      },
    },
  };
}
