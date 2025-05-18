import { expect, type Locator, type Page } from "@playwright/test";
import Selectors from "../selectors";

export class EmployeesPage {
  readonly page: Page;

  readonly employeeFullName: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employeeFullName = page.locator(
      `[data-testid="${Selectors.user.fulName}"]`
    );
  }

  getUserInEmployeeTable(employeeName: string): Locator {
    return this.page.locator("table tr", { hasText: employeeName });
  }

  async goToEmployeePage(employeeName: string): Promise<void> {
    const row = this.getUserInEmployeeTable(employeeName);
    await row.click();
  }

  async expectEmployeeNameToBeVisible(employeeName: string): Promise<void> {
    await expect(this.employeeFullName).toHaveText(employeeName);
  }
}
