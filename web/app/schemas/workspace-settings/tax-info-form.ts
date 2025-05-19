import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const taxInfoFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.TaxId),
  taxId: z.string(),
});
