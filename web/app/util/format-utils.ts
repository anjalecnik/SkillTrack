import { t } from "i18next";
import { IAddress } from "~/types";

export interface IAddressProps {
  addresses: IAddress[];
}

export interface IPhoneProps {
  countryPhoneCode?: string;
  phone?: string;
}

export interface IUserWithFullName {
  name: string;
  surname: string;
  middleName?: string;
}

export function fullNameFormatter(user: IUserWithFullName): string | null {
  return user?.name && user?.surname
    ? `${user?.name} ${user?.middleName ?? ""} ${user?.surname}`
    : t("error.notPresent");
}

export function addressFormatter(address: IAddress | undefined) {
  return !address ? t("error.notPresent") : `${address.streetAddress}, ${address.postalCode} ${address.city}`;
}

export function phoneFormatter(phoneDetails: IPhoneProps): string | null {
  return phoneDetails?.phone && phoneDetails?.countryPhoneCode
    ? `(+${phoneDetails?.countryPhoneCode}) ${phoneDetails?.phone}`
    : t("error.notPresent");
}

export const vacationDaysFormatter = (
  usedDays: number,
  assignedDays: number
): string => {
  if (!usedDays && usedDays !== 0 && !assignedDays && assignedDays !== 0) {
    return t("error.notPresent");
  }

  const used = usedDays ? usedDays : 0;
  const assigned = assignedDays ? assignedDays : 0;

  return `${used} / ${assigned} ${t("common.days")}`;
};
