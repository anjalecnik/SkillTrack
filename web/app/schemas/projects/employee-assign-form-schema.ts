import { z } from "zod";
import { WorkspaceProjectAccordions } from "~/types";

export const employeeAssignFormSchema = z.object({
  intent: z.literal(WorkspaceProjectAccordions.Employees),
  projects: z
    .array(
      z.object({
        id: z.number(),
        isProjectLead: z.literal("on").optional(),
      })
    ),
  userId: z.number(),
});
