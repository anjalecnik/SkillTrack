import { z } from "zod";

export const createOfficeFormSchema = z.object({
  intent: z.literal("create"),
  name: z.string(),
  address: z.string(),
});
