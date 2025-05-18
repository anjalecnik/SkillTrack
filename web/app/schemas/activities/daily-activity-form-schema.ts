import { z } from "zod";
import {
  ActivityAction,
  ActivityWorkLocation,
  DailyActivityIntent,
} from "~/types";

export const dailyActivityFormSchema = z.object({
  intent: z.literal(DailyActivityIntent.DailyActivities),
  location: z.nativeEnum(ActivityWorkLocation).optional(),
  lunch: z.union([
    z.literal("on").transform(() => true),
    z.literal(undefined).transform(() => false),
  ]),
  workingTime: z.array(
    z.object({
      timeRange: z.object({
        fromTimeStart: z.string(),
        toTimeEnd: z.string(),
      }),
      projectId: z.number(),
    })
  ),
  action: z.nativeEnum(ActivityAction),
  activityId: z.number().optional(),
  date: z.string(),
  userId: z.number().optional(),
});

export type DailyActivitySubmissionType = z.infer<
  typeof dailyActivityFormSchema
>;
