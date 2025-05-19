import { z } from "zod";
import { WorkspaceProjectAccordions } from "~/types";

export const projectInfoFormSchema = z.object({
  intent: z.literal(WorkspaceProjectAccordions.ProjectInfo),
  name: z.string(),
  dateStart: z.string(),
  dateEnd: z.string().optional(),
});

export type ProjectInfoFormSubmissionType = z.infer<
  typeof projectInfoFormSchema
>;
