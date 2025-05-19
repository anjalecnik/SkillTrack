import { z } from "zod";

export const addProjectFormSchema = z.object({
  intent: z.literal("create"),
  name: z.string(),
});
