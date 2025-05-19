import { EmployeeAddressType, WorkspaceAddressType } from "~/types";

export interface IAddress {
  id?: number;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  countryCode?: string;
  type?: WorkspaceAddressType | EmployeeAddressType;
}
