import { z } from "zod";

export const userManagementFormSchema = z.object({
  intent: z.literal("userManagement"),
  ownerId: z.number(),
  adminIds: z.string(),
});
