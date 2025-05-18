import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const vacationsFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.Vacations),
  date: z.string(),
});
