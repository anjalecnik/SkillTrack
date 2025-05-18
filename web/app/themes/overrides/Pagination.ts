import { ComponentOverrideType } from "../types";

export default function Pagination(): ComponentOverrideType<"MuiPagination"> {
  return {
    MuiPagination: {
      defaultProps: {
        shape: "rounded",
      },
    },
  };
}
