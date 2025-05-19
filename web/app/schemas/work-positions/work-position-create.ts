import { z } from "zod";
import { WorkPositionLevel } from "~/types";

export const workspacePositionCreateSchema = z.object({
  intent: z.literal("create"),
  name: z.string(),
  level: z.nativeEnum(WorkPositionLevel),
  description: z.string(),
  workPositionPromotionId: z.number().optional(),
});
