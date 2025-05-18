import { z } from "zod";
import { ActivityFormDialogs, MoreToReportActivityType } from "~/types";

export const overtimeFormDialogSchema = z.object({
  intent: z.literal(ActivityFormDialogs.Overtime),
  activityType: z.nativeEnum(MoreToReportActivityType),
  projectId: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
});

export type OvertimeSubmissionType = z.infer<typeof overtimeFormDialogSchema>;
