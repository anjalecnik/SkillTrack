import { z } from "zod";
import { WorkspaceSettingsAccordions } from "~/types";

export const additionalReceiptsAfterConfirmation = z.object({
  intent: z.literal(WorkspaceSettingsAccordions.AdditionalReceiptsAfterConfirmation),
  additionalReceiptsAfterConfirmation: z.array(
    z.string().email({
      message: "workspaceSettings.invalidEmail",
    })
  ),
});
