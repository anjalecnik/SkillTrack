import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const whitelistDomainFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.WhitelistDomain),
  whitelistDomains: z.array(z.string()),
});
