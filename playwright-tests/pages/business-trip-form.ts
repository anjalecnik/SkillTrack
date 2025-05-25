import { type Locator, type Page } from "@playwright/test";
import Selectors from "../selectors";
import { TestsDateHelper } from "../helpers/date-helper";
import { USER_ENTITY } from "../mocks/user.mocks";

export class BusinessTripForm {
  readonly page: Page;
  readonly startDateInput: Locator;
  readonly endDateInput: Locator;
  readonly destinationInput: Locator;
  readonly moreToReportButton: Locator;
  readonly moreToReportSubmitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.startDateInput = page.locator(
      `[data-testid="${Selectors.moreToReport.startDateInput}"]`
    );

    this.endDateInput = page.locator(
      `[data-testid="${Selectors.moreToReport.endDateInput}"]`
    );

    this.destinationInput = page.locator(
      `data-testid=${Selectors.moreToReport.destination}`
    );

    this.moreToReportButton = page.locator(
      `data-testid=${Selectors.moreToReport.moreToReportBtn}`
    );

    this.moreToReportSubmitButton = page.locator(
      `data-testid=${Selectors.moreToReport.moreToReportSubmitBtn}`
    );
  }

  async openMoreToReportDialog(): Promise<void> {
    await this.moreToReportButton.waitFor();
    await this.moreToReportButton.click();
  }

  async createBusinessTrip() {
    const formattedDate = TestsDateHelper.getFormattedDate(
      TestsDateHelper.getLastWorkingDay()
    );
    await this.startDateInput.type(formattedDate);
    await this.endDateInput.type(formattedDate);

    await this.destinationInput.fill("Ljubljana");

    await this.moreToReportSubmitButton.waitFor();
    await this.moreToReportSubmitButton.click();

    const postResponsePromise = this.page.waitForResponse(
      (response) =>
        response
          .url()
          .includes(`/api/user-hub/users/${USER_ENTITY.id}/activities`) &&
        response.request().method() === "POST"
    );
    const postResponse = await postResponsePromise;
    const responseBody = await postResponse.json();
    const activityId = responseBody.id;

    return activityId;
  }
}
