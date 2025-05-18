import { BreadcrumbVariant } from "~/types";

export interface IBreadcrumbListItems {
  variant: BreadcrumbVariant;
  text: string;
  dataTestId?: string;
  onClick?: () => void;
}
