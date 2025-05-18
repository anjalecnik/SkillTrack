import { z } from "zod";

export const createFloorFormSchema = z.object({
  intent: z.literal("create"),
  office: z.string(),
  name: z.string(),
});
