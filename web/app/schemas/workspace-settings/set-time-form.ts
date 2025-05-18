import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const setTimeFormSchema = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.SetTime),
  time: z.string(),
});
