import { z } from "zod";
import { EmployeeSettingsAccordions, WorkspaceUserGender } from "~/types";

export const personalSettingsFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.PersonalSettings),
  name: z.string(),
  email: z
    .string()
    .email({
      message: "workspaceSettings.invalidEmail",
    })
    .optional(),
  surname: z.string(),
  countryPhoneCode: z.string().optional(),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string().optional(),
  addressId: z.number().optional(),
  additionalAddresses: z.string().optional(),
});
