import { Card, CardProps } from "@mui/material";
import { SystemCssProperties, Theme } from "@mui/system";

export function CardLayout({ children, id, sx, ...rest }: CardProps) {
  return (
    <Card
      id={id}
      sx={{
        ...sx,
        padding: (sx as SystemCssProperties<Theme>)?.padding || "20px",
      }}
      {...rest}
    >
      {children}
    </Card>
  );
}
