import { ComponentOverrideType } from "../types";

export default function TableRow(): ComponentOverrideType<"MuiTableRow"> {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-of-type": {
            "& .MuiTableCell-root": {
              borderBottom: "none",
            },
          },
          "& .MuiTableCell-root": {
            "&:last-of-type": {
              paddingRight: 24,
            },
            "&:first-of-type": {
              paddingLeft: 24,
            },
          },
        },
      },
    },
  };
}
