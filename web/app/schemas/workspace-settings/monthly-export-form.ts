import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const monthlyExportFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.MonthlyExport),
  activityLockDate: z.string(),
  exportMonth: z.string().optional(),
});
