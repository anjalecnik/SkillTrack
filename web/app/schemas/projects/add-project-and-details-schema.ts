import { z } from "zod";

export const addProjectAndDetailsSchema = z.object({
  intent: z.literal("createAndAddMoreDetails"),
  name: z.string(),
});
