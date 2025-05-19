import { z } from "zod";
import { ActivityFormDialogs, MoreToReportActivityType } from "~/types";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "~/constants";
import { t } from "i18next";

export const expensesFormDialogSchema = z.object({
  intent: z.literal(ActivityFormDialogs.Expense),
  activityType: z.nativeEnum(MoreToReportActivityType),
  projectId: z.number(),
  date: z.string(),
  valueInEuro: z.number().min(0.01).max(99999999.99),
  description: z.string().optional(),
  isPaidWithCompanyCard: z.boolean().optional().default(false),
  file: z.any().superRefine((file, ctx) => {
    if (!file || file.size <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("error.fileRequiredMessage") ?? "File is required.",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("error.tooBigFileMessage") ?? "File too big.",
      });
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t("error.unallowedFileTypeMessage") ?? "Unallowed file type.",
      });
    }
  }),
});

export type ExpensesTripSubmissionType = z.infer<
  typeof expensesFormDialogSchema
>;
