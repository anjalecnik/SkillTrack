import { z } from "zod";
import { WorkspaceProjectAccordions } from "~/types";

export const projectParticipantsFormSchema = z.object({
  intent: z.literal(WorkspaceProjectAccordions.Employees),
  participantId: z.number(),
});
