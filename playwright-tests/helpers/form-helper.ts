import { Page } from "@playwright/test";
import Selectors from "../selectors";

export const waitForFormDialogToOpen = async (page: Page): Promise<void> => {
  await page.waitForSelector(`[data-testid="${Selectors.common.formDialog}"]`);
};
