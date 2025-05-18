import { z } from "zod";

export const requestUpdateSchema = z.object({
  intent: z.literal("updateStatus"),
  id: z.number(),
  action: z.string(),
  employeeId: z.number(),
});
