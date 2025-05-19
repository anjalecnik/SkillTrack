import { ReactNode } from "react";
import { ChipProps } from "@mui/material";
import { OverrideIcon } from "~/types";

export enum NavActionType {
  FUNCTION = "function",
  LINK = "link",
}

export type NavActionProps = {
  type: NavActionType;
  label: string;
  url?: string;
  target?: boolean;
  icon: OverrideIcon;
  function: () => void;
};

export type NavItemType = {
  breadcrumbs?: boolean;
  caption?: ReactNode | string;
  children?: NavItemType[];
  elements?: NavItemType[];
  chip?: ChipProps;
  color?: "primary" | "secondary" | "default" | undefined;
  disabled?: boolean;
  external?: boolean;
  isDropdown?: boolean;
  icon?: OverrideIcon;
  secondaryIcon?: OverrideIcon;
  id: string;
  search?: string;
  target?: boolean;
  title?: ReactNode | string;
  type?: string;
  url?: string | undefined;
  actions?: NavActionProps[];
  divider?: boolean;
};

export type LinkTarget = "_blank" | "_self" | "_parent" | "_top";
