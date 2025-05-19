import { z } from "zod";
import { EmployeeSettingsAccordions } from "~/types";

export const workPositionFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.WorkPosition),
  workspaceTeamId: z.number().optional(),
  workspaceWorkPositionId: z.number().optional(),
  managerId: z.number().optional(),
});
