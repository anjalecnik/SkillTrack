import { expect, type Locator, type Page } from "@playwright/test";
import Selectors from "../selectors";
import { UserEntity } from "api/src/libs/db/entities/user.entity";
import { TestsDateHelper } from "../helpers/date-helper";

export class EmployeesPage {
  readonly page: Page;

  readonly searchInput: Locator;
  readonly userNameInput: Locator;
  readonly userSurnameInput: Locator;
  readonly birthDateInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailAddressInput: Locator;
  readonly addUserButton: Locator;
  readonly createEmployeeButton: Locator;
  readonly accordionSaveButton: Locator;
  readonly personalSettingsAccordion: Locator;

  constructor(page: Page) {
    this.page = page;

    this.searchInput = page.locator(
      `[data-testid="${Selectors.common.searchInput}"]`
    );
    this.userNameInput = page.locator(
      `[data-testid="${Selectors.user.employeeName}"]`
    );
    this.userSurnameInput = page.locator(
      `[data-testid="${Selectors.user.employeeSurname}"]`
    );
    this.addUserButton = page.locator(
      `[data-testid="${Selectors.user.addEmployeeBtn}"]`
    );
    this.firstNameInput = page.locator(
      `[data-testid="${Selectors.user.firstName}"]`
    );
    this.lastNameInput = page.locator(
      `[data-testid="${Selectors.user.lastName}"]`
    );
    this.emailAddressInput = page.locator(
      `[data-testid="${Selectors.user.emailAddress}"]`
    );
    this.createEmployeeButton = page.locator(
      `[data-testid="${Selectors.user.createEmployeeBtn}"]`
    );
    this.birthDateInput = page.locator(
      `[data-testid="${Selectors.user.birthDate}"]`
    );
    this.accordionSaveButton = page.locator(
      `[data-testid="${Selectors.common.accordionSaveBtn}"]`
    );
    this.personalSettingsAccordion = page.locator(
      `[data-testid="${Selectors.user.personalSettingsAccordion}"]`
    );
  }

  async filterEmployees(employeeName: string): Promise<void> {
    await this.searchInput.fill(employeeName);
  }

  async goToEmployeePage(employeeName: string): Promise<void> {
    const row = this.getUserInEmployeeTable(employeeName);
    await row.click();
  }

  async openAddNewEmployeeDialog(): Promise<void> {
    await this.addUserButton.waitFor();
    await this.addUserButton.click();
  }

  async createNewEmployee(user: UserEntity): Promise<void> {
    await this.firstNameInput.fill(user.name);
    await this.lastNameInput.fill(user.surname);
    await this.emailAddressInput.fill(user.email);

    await this.createEmployeeButton.waitFor();
    await this.createEmployeeButton.click();
  }

  async updateEmployee(user: UserEntity): Promise<void> {
    await this.personalSettingsAccordion.waitFor();
    await this.personalSettingsAccordion.click();

    await this.userNameInput.fill(user.name);
    await this.birthDateInput.type(
      TestsDateHelper.getFormattedDate(user.birthDate!)
    );

    await this.accordionSaveButton.waitFor();
    await this.accordionSaveButton.click();
  }

  getUserInEmployeeTable(employeeName: string): Locator {
    return this.page.locator("table tr", { hasText: employeeName });
  }

  async expectEmployeeNameToBeVisible(employeeName: string): Promise<void> {
    await expect(this.userNameInput).toHaveValue(employeeName);
  }

  async expectEmployeeSurnameToBeVisible(
    employeeSurname: string
  ): Promise<void> {
    await expect(this.userSurnameInput).toHaveValue(employeeSurname);
  }
}
