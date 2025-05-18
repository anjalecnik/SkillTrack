import React, { CSSProperties, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardProps,
  CardHeaderProps,
  CardContentProps,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { ThemeMode } from "~/types";

const headerSX = {
  p: "15px",
};

export interface MainCardProps<T> {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactNode | string;
  subheader?: ReactNode | string;
  style?: CSSProperties;
  content?: boolean;
  contentSX?: CardContentProps["sx"];
  darkTitle?: boolean;
  divider?: boolean;
  sx?: CardProps["sx"];
  secondary?: CardHeaderProps["action"];
  shadow?: string;
  elevation?: number;
  title?: ReactNode | string;
  footer?: ReactNode;
  tabs?: { label: string; value: string; dataTestId?: string }[];
  tabValue?: string;
  onTabChange?: (event: React.SyntheticEvent, value: T) => void;
}

export function MainCard<T>({
  border = true,
  boxShadow = true,
  children,
  subheader,
  content = true,
  contentSX,
  divider = true,
  elevation,
  secondary,
  shadow,
  sx,
  title,
  footer,
  tabs,
  tabValue,
  onTabChange,
  ...others
}: MainCardProps<T>) {
  const theme = useTheme();
  boxShadow =
    theme.palette.mode === ThemeMode.DARK ? boxShadow || true : boxShadow;

  return (
    <Card
      elevation={elevation || 0}
      {...others}
      sx={{
        position: "relative",
        border: border ? "1px solid" : "none",
        borderRadius: 1,
        borderColor:
          theme.palette.mode === ThemeMode.DARK
            ? theme.palette.divider
            : theme.palette.grey.A800,
        boxShadow:
          boxShadow && (!border || theme.palette.mode === ThemeMode.DARK)
            ? shadow || theme.customShadows.z1
            : "inherit",
        ...sx,
      }}
    >
      {title && (
        <CardHeader
          sx={headerSX}
          titleTypographyProps={{ variant: "h5", fontWeight: 500 }}
          title={title}
          action={secondary}
          subheader={subheader}
        />
      )}
      {tabs && (
        <Tabs
          value={tabValue}
          onChange={onTabChange}
          aria-label="wrapped label tabs example"
        >
          {tabs.map((tab, index) => (
            <Tab
              key={`${tab}-${index}`}
              value={tab.value}
              label={tab.label}
              data-testid={tab.dataTestId}
            />
          ))}
        </Tabs>
      )}

      {divider && <Divider />}

      {content && <CardContent sx={contentSX}>{children}</CardContent>}
      {!content && children}

      {footer}
    </Card>
  );
}
