import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const invitationTextFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.InvitationText),
  invitationText: z.string().max(500),
});
