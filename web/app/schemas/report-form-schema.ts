import { z } from "zod";
import { DEFAULT_PROJECT_DATE_FORMAT } from "~/constants";
import { isEndDateGreaterOrEqualToStartDate } from "~/util";

export const reportFormSchema = z
  .object({
    intent: z.literal("generate"),
    workspaceId: z.number(),
    employeeIds: z.string().optional(),
    projectIds: z.string().optional(),
    fromDateStart: z.string().optional(),
    toDateEnd: z.string().optional(),
  })
  .refine(
    (data) => {
      const { fromDateStart, toDateEnd } = data;
      return toDateEnd && fromDateStart
        ? isEndDateGreaterOrEqualToStartDate(
            fromDateStart,
            toDateEnd,
            DEFAULT_PROJECT_DATE_FORMAT
          )
        : true;
    },
    { message: "error.endDateBeforeStartDate", path: ["toDateEnd"] }
  )
  .refine((data) => {
    const { employeeIds, projectIds } = data;
    const employeeIdsParsed = JSON.parse(employeeIds ?? "");
    const projectIdsParsed = JSON.parse(projectIds ?? "");

    const isBothEmpty = !employeeIdsParsed?.length && !projectIdsParsed?.length;

    return (
      !isBothEmpty ||
      (employeeIdsParsed.length && !projectIdsParsed?.length) ||
      (!employeeIdsParsed?.length && projectIdsParsed.length)
    );
  });

export type ReportFormSchema = Partial<z.infer<typeof reportFormSchema>>;
