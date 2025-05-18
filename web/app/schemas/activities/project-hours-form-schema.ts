import { z } from "zod";
import { DEFAULT_DAILY_REPORT_TOTAL_HOURS } from "~/constants";
import { DailyActivityIntent } from "~/types";

export const projectHoursFormSchema = z.object({
  intent: z.literal(DailyActivityIntent.Activities),
  activities: z
    .array(
      z.object({
        projectId: z.number(),
        hours: z
          .number()
          .int()
          .min(1)
          .max(DEFAULT_DAILY_REPORT_TOTAL_HOURS)
          .optional(), // TODO: Replace with a value from backend
      })
    )
    .refine(
      (activities) => {
        const totalHours = activities.reduce(
          (sum, activity) => sum + (activity.hours ? activity.hours : 8),
          0
        );

        return totalHours <= DEFAULT_DAILY_REPORT_TOTAL_HOURS; // TODO: Replace with a value from backend
      },
      {
        message: "error.tooManyHours",
      }
    ),
});

export type ProjectHoursSubmissionType = z.infer<typeof projectHoursFormSchema>;
