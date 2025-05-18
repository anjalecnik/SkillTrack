import { z } from "zod";

export const addEmployeeFormSchema = z.object({
  intent: z.string(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email({
    message: "workspaceSettings.invalidEmail",
  }),
});
