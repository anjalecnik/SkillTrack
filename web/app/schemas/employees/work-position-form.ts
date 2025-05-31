import { z } from "zod";
import { EmployeeSettingsAccordions } from "~/types";

export const workPositionFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.WorkPosition),
  workspaceWorkPositionId: z.number().optional(),
  managerId: z.number().optional(),
});
