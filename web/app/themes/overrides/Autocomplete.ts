import { ComponentOverrideType } from "../types";

export default function Autocomplete(): ComponentOverrideType<"MuiAutocomplete"> {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            padding: "3px 9px",
          },
        },
        popupIndicator: {
          width: "auto",
          height: "auto",
        },
        clearIndicator: {
          width: "auto",
          height: "auto",
        },
      },
    },
  };
}
