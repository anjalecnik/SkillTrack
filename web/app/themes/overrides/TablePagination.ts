import { ComponentOverrideType } from "../types";

export default function TablePagination(): ComponentOverrideType<"MuiTablePagination"> {
  return {
    MuiTablePagination: {
      styleOverrides: {
        selectLabel: {
          fontSize: "0.875rem",
        },
        displayedRows: {
          fontSize: "0.875rem",
        },
      },
    },
  };
}
