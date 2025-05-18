import { z } from "zod";
import { ActivityFormDialogs, MoreToReportActivityType } from "~/types";

export const onCallFormDialogSchema = z.object({
  intent: z.literal(ActivityFormDialogs.OnCall),
  activityType: z.nativeEnum(MoreToReportActivityType),
  projectId: z.number(),
  dateStart: z.string(),
  startTime: z.string(),
  dateEnd: z.string(),
  endTime: z.string(),
  description: z.string().optional(),
});

export type onCallSubmissionType = z.infer<typeof onCallFormDialogSchema>;
