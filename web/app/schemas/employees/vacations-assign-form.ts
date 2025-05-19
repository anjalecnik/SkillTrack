import { z } from "zod";
import { EmployeeSettingsAccordions } from "~/types";
import { CURRENT_YEAR, LAST_YEAR } from "~/constants";

export const vacationsAssignFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.Vacation),
  assignedVacations: z.array(
    z
      .object({
        id: z.number().optional(),
        year: z.number(),
        assignedDays: z.number().int().min(1).max(100),
        oldVacationExpiration: z.string().optional(),
        initialUsedDays: z.number().optional(),
        initialDate: z.string().optional(),
        description: z.string().optional(),
      })
      .refine(
        (data) => {
          const { year } = data;
          return year <= CURRENT_YEAR && year >= LAST_YEAR;
        },
        { message: "error.invalidYear", path: ["year"] }
      )
      .refine(
        (data) => {
          const { assignedDays, initialUsedDays } = data;
          return assignedDays > (initialUsedDays ?? 0);
        },
        {
          message: "error.usedDaysMustBeLessThanAssigned",
          path: ["initialUsedDays"],
        }
      )
  ),
  hiddenOldVacations: z.array(
    z.object({
      id: z.number(),
      year: z.number(),
      assignedDays: z.number().int().min(1).max(100),
      oldVacationExpiration: z.string().optional(),
      initialUsedDays: z.number(),
      initialDate: z.string(),
      description: z.string().optional(),
    })
  ),
});

export type VacationsAssignSubmissionType = z.infer<
  typeof vacationsAssignFormSchema
>;
