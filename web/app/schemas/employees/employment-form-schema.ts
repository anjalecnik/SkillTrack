import dayjs from "dayjs";
import { z } from "zod";
import {
  EmployeeSettingsAccordions,
  WorkspaceUserEmploymentType,
} from "~/types";

export const employmentFormSchema = z.object({
  intent: z.literal(EmployeeSettingsAccordions.Employment),
  employment: z.array(
    z
      .object({
        id: z.number().optional(),
        type: z.nativeEnum(WorkspaceUserEmploymentType),
        dateStart: z.string(),
        dateEnd: z.string().optional(),
        probationPeriodEndDate: z.string().optional(),
      })
      .superRefine((data, ctx) => {
        if (
          [WorkspaceUserEmploymentType.Temporary, WorkspaceUserEmploymentType.Contractor].includes(data.type) &&
          !data.dateEnd
        ) {
          ctx.addIssue({
            code: "custom",
            path: ["dateEnd"],
            message: "error.required",
          });
        }
        if (
          data.type === WorkspaceUserEmploymentType.Permanent &&
          (!dayjs(data.probationPeriodEndDate, "DD. MMM, YYYY").isValid() ||
            !data.probationPeriodEndDate)
        ) {
          ctx.addIssue({
            code: "custom",
            path: ["probationPeriodEndDate"],
            message: "error.required",
          });
        }
      })
  ),
});
