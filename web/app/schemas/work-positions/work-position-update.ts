import { z } from "zod";
import { WorkPositionLevel } from "~/types";

export const workspacePositionUpdateSchema = z.object({
  intent: z.literal("update"),
  id: z.number(),
  name: z.string(),
  level: z.nativeEnum(WorkPositionLevel),
  description: z.string(),
  workPositionPromotionId: z.number().optional(),
});
