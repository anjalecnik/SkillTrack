import { z } from "zod";
import { EmployeeSettingsAccordions, UserStatusWithoutInvited } from "~/types";

export const employeeStatusFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.UserStatus),
  status: z.nativeEnum(UserStatusWithoutInvited).optional(),
});
