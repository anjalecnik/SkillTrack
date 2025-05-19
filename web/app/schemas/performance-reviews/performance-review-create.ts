import { z } from "zod";
import { PerformanceReviewQuartal } from "~/types/enums/performance-review-quartal.enum";

export const workspacePositionCreateSchema = z.object({
  intent: z.literal("create"),
  id: z.number(),
  quartal: z.nativeEnum(PerformanceReviewQuartal),
});
