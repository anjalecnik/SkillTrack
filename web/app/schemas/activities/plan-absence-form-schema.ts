import { z } from "zod";
import { ActivityFormDialogs, PlanAbsenceActivityType } from "~/types";

export const planAbsenceFormSchema = z.object({
  intent: z.literal(ActivityFormDialogs.PlanAbsence),
  activityType: z.nativeEnum(PlanAbsenceActivityType),
  dateStart: z.string(),
  dateEnd: z.string(),
  description: z.string().optional(),
});

export type PlanAbsenceSubmissionType = z.infer<typeof planAbsenceFormSchema>;
