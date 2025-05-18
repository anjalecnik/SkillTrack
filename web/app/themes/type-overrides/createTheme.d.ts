// eslint-disable-next-line
import * as Theme from "@mui/material";
import { CustomShadowProps } from "../types";

declare module "@mui/material" {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
