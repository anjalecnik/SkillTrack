import { expect, type Page } from "@playwright/test";
import Selectors from "../selectors";

export class RequestsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async approveRequestById(activityId: any): Promise<void> {
    const approveButton = this.page.locator(
      `[data-testid="${Selectors.requests.approveBtn}${activityId}"]`
    );

    await approveButton.waitFor();
    await approveButton.click();

    await expect(approveButton).not.toBeVisible();
  }
}
