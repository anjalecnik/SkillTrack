import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const basicInfoFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.BasicInfo),
  name: z.string(),
  email: z.string().email({
    message: "workspaceSettings.invalidEmail",
  }),
  countryPhoneCode: z.string().optional(),
  phone: z.string().optional(),
  addressId: z.number().optional(),
  streetAddress: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  countryCode: z.string().optional(),
  additionalAddresses: z.string(),
});
