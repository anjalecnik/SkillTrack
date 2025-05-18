import { z } from "zod";

export const deleteSchema = z.object({
  intent: z.literal("delete"),
  id: z.number(),
  employeeId: z.number().optional(),
});
