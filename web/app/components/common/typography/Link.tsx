import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "@remix-run/react";
import {
  Button as MuiButton,
  Link as MuiLink,
  PaletteOptions,
} from "@mui/material";

export interface LinkProps extends RouterLinkProps {
  variant?: "link" | "button";
  underline?: boolean;
  color?: keyof PaletteOptions;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const Link = ({
  children,
  variant = "link",
  underline,
  color,
  onClick,
  ...props
}: LinkProps) => {
  const underlineValue = (): string => (underline ? "underline" : "none");

  return (
    <RouterLink {...props} style={{ textDecoration: "none" }} onClick={onClick}>
      {variant === "link" && (
        <MuiLink
          component="span"
          underline={underline ? "always" : "none"}
          sx={{
            color: color,
            cursor: "pointer",
          }}
        >
          {children}
        </MuiLink>
      )}
      {variant === "button" && (
        <MuiButton
          sx={{
            textDecoration: underlineValue(),
            "&:hover": { textDecoration: underlineValue() },
          }}
          color="primary"
          variant="contained"
        >
          {children}
        </MuiButton>
      )}
    </RouterLink>
  );
};
