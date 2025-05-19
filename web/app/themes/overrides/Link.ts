import { ComponentOverrideType } from "../types";

export default function Link(): ComponentOverrideType<"MuiLink"> {
  return {
    MuiLink: {
      defaultProps: {
        underline: "hover",
      },
    },
  };
}
