import { z } from "zod";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";

export const performanceReviewFormDialogSchema = z.object({
  activityId: z.number().optional(),
  employeeId: z.number(),
  quartal: z.nativeEnum(PerformanceReviewQuartal),
  year: z.number(),
  answer1: z.number(),
  answer2: z.number(),
  answer3: z
    .union([z.literal("true"), z.literal("false")])
    .transform((val) => val === "true"),
  answer4: z
    .union([z.literal("true"), z.literal("false")])
    .transform((val) => val === "true"),
});

export type PerformanceReviewSubmissionType = z.infer<
  typeof performanceReviewFormDialogSchema
>;

export const monthSelectFormSchema = z.object({
  activityLockDate: z.string(),
  exportMonth: z.string().optional(),
});
