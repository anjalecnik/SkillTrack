import { ComponentOverrideType } from "../types";

export default function ButtonGroup(): ComponentOverrideType<"MuiButtonGroup"> {
  return {
    MuiButtonGroup: {
      defaultProps: {
        disableRipple: true,
      },
    },
  };
}
