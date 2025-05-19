import { z } from "zod";

export const updateOfficeFormSchema = z.object({
  intent: z.literal("update"),
  name: z.string(),
  office: z.string(),
  address: z.string(),
});
