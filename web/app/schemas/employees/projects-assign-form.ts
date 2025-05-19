import { z } from "zod";
import { EmployeeSettingsAccordions } from "~/types";

export const projectAssignFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.Projects),
  projects: z
    .array(
      z.object({
        id: z.number(),
        isProjectLead: z.literal("on").optional(),
      })
    )
});
