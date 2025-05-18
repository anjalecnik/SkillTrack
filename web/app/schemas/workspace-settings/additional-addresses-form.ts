import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const additionalAddressesFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.AdditionalAddress),
  addresses: z.array(
    z.object({
      id: z.number().optional(),
      streetAddress: z.string(),
      city: z.string(),
      postalCode: z.string(),
      countryCode: z.string(),

      type: z.string(),
    })
  ),
  mainAddress: z.string(),
});
