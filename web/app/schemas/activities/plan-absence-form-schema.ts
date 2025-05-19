import { z } from "zod";
import {
  ActivityFormDialogs,
  PlanAbsenceActivityType,
  SpecialLeaveActivityType,
} from "~/types";

export const planAbsenceFormSchema = z.object({
  intent: z.literal(ActivityFormDialogs.PlanAbsence),
  activityType: z.nativeEnum(PlanAbsenceActivityType),
  specialLeaveActivityType: z.nativeEnum(SpecialLeaveActivityType).optional(),
  dateStart: z.string(),
  dateEnd: z.string(),
  timeStart: z.string().optional(),
  timeEnd: z.string().optional(),
  description: z.string().optional(),
});

export type PlanAbsenceSubmissionType = z.infer<typeof planAbsenceFormSchema>;
