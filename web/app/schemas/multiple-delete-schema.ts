import { z } from "zod";

export const multipleDeleteSchema = z.object({
  intent: z.literal("delete"),
  ids: z.string(),
});
