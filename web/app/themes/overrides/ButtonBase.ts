import { ComponentOverrideType } from "../types";

export default function ButtonBase(): ComponentOverrideType<"MuiButtonBase"> {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  };
}
