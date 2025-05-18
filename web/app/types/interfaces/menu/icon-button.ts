import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ComponentClass, FunctionComponent } from "react";

export type OverrideIcon =
  | (OverridableComponent<SvgIconTypeMap<object, "svg">> & {
      muiName: string;
    })
  | ComponentClass<object>
  | FunctionComponent<object>;
