import { ReactNode } from "react";
import { Tool, OverrideIcon } from "~/types";

export enum ToolbarItemType {
  Tool = "tool",
  Action = "action",
}

export interface IToolbarItem {
  icon: OverrideIcon;
  type: ToolbarItemType;
  tool: Tool;
  tooltip?: ReactNode;
  text?: string;
}
