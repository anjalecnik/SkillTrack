import { forwardRef, ReactNode, Ref } from "react";

// material-ui
import {
  IconButton as MuiIconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import { ButtonVariantProps, IconButtonShapeProps } from "~/themes/types";

// ==============================|| STYLED - ICON BUTTON ||============================== //

interface StyleProps {
  shape?: IconButtonShapeProps;
  variant?: ButtonVariantProps;
}

const IconButtonStyle = styled(MuiIconButton, {
  shouldForwardProp: (prop) =>
    prop !== "variant" && prop !== "shape" && prop !== "theme",
})<StyleProps>(({ theme, variant, shape }) => ({
  position: "relative",
  "::after": {
    content: '""',
    display: "block",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    borderRadius: shape === "rounded" ? "50%" : 4,
    opacity: 0,
    transition: "all 0.5s",
  },

  ":active::after": {
    position: "absolute",
    borderRadius: shape === "rounded" ? "50%" : 4,
    left: 0,
    top: 0,
    opacity: 1,
    transition: "0s",
  },
  ...(shape === "rounded" && {
    borderRadius: "50%",
  }),
  ...(variant === "outlined" && {
    border: "1px solid",
    borderColor: "inherit",
  }),
  ...(variant === "dashed" && {
    border: "1px dashed",
    borderColor: "inherit",
  }),
  ...(variant !== "text" && {
    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
    },
  }),
}));

// ==============================|| EXTENDED - ICON BUTTON ||============================== //

export interface Props extends IconButtonProps {
  shape?: IconButtonShapeProps;
  variant?: ButtonVariantProps;
  children: ReactNode;
}

export const IconButton = forwardRef(
  (
    {
      variant = "text",
      shape = "square",
      children,
      color = "primary",
      ...others
    }: Props,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <IconButtonStyle
        ref={ref}
        disableRipple
        variant={variant}
        shape={shape}
        color={color}
        {...others}
      >
        {children}
      </IconButtonStyle>
    );
  }
);

IconButton.displayName = "IconButton";
