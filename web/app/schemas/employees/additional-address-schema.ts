import { z } from "zod";
import { EmployeeSettingsAccordions } from "~/types";

export const addressFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.Address),
  addresses: z.array(
    z.object({
      id: z.number().optional(),
      streetAddress: z.string(),
      city: z.string(),
      postalCode: z.string(),
      countryCode: z.string(),
    })
  ),
  mainAddress: z.string(),
});
