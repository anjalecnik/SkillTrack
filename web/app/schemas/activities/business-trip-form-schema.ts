import { z } from "zod";
import { ActivityFormDialogs, MoreToReportActivityType } from "~/types";

export const businessTripFormDialogSchema = z.object({
  intent: z.literal(ActivityFormDialogs.BusinessTrip),
  activityType: z.nativeEnum(MoreToReportActivityType),
  activityId: z.number().optional(),
  projectId: z.number(),
  dateStart: z.string(),
  dateEnd: z.string(),
  location: z.string(),
  distanceInKM: z.number().min(0).max(10000000).optional(),
  description: z.string().optional(),
});

export type BusinessTripSubmissionType = z.infer<
  typeof businessTripFormDialogSchema
>;
