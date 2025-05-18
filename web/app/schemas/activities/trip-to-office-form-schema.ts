import { z } from "zod";
import { ActivityFormDialogs, MoreToReportActivityType } from "~/types";

export const tripToOfficeFormDialogSchema = z.object({
  intent: z.literal(ActivityFormDialogs.TripToOffice),
  activityType: z.nativeEnum(MoreToReportActivityType),
  activityId: z.number().optional(),
  projectId: z.number(),
  dateStart: z.string(),
  departureTime: z.string(),
  dateEnd: z.string(),
  returnTime: z.string(),
  locationFrom: z.string(),
  locationTo: z.string(),
  distanceInKM: z.number().min(0).max(10000000),
  description: z.string().optional(),
});

export type TripToOfficeSubmissionType = z.infer<
  typeof tripToOfficeFormDialogSchema
>;
