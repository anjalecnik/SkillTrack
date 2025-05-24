import { expect, test } from "@playwright/test";
import {
  USER_CREATE_MOCK,
  USER_ENTITY,
  USER_UPDATE_MOCK,
} from "./mocks/user.mocks";
import { EmployeesPage } from "./pages/employees-page";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { query } from "./global/db-utils";
import { ProjectsPage } from "./pages/projects-page";
import { PROJECT_CREATE_MOCK } from "./mocks/project.mocks";
import { loginWithGoogleToken } from "./helpers/auth-helper";

dotenv.config({ path: resolve(__dirname, ".env") });

const APP_URL = "http://localhost:5173";

test.describe("Admin SkillTrack tests", () => {
  test.beforeEach(async ({ page }) => {
    await loginWithGoogleToken(page, process.env.GOOGLE_IDTOKEN_ADMIN!);
  });

  test("[ST-8] Access to employees", async ({ page }) => {
    await page.goto(`${APP_URL}/workspace-hub/employees`);

    const employeesPage = new EmployeesPage(page);

    await employeesPage.filterEmployees(USER_ENTITY.name);
    await employeesPage.goToEmployeePage(
      USER_ENTITY.name + " " + USER_ENTITY.surname
    );

    await employeesPage.expectEmployeeNameToBeVisible(USER_ENTITY.name);
    await employeesPage.expectEmployeeSurnameToBeVisible(USER_ENTITY.surname);
  });

  test("[ST-8] Create employee", async ({ page }) => {
    await page.goto(`${APP_URL}/workspace-hub/employees`);

    const employeesPage = new EmployeesPage(page);

    await employeesPage.openAddNewEmployeeDialog();
    await employeesPage.createNewEmployee(USER_CREATE_MOCK);

    await employeesPage.filterEmployees(USER_CREATE_MOCK.name);
    await employeesPage.goToEmployeePage(
      USER_CREATE_MOCK.name + " " + USER_CREATE_MOCK.surname
    );
    await employeesPage.expectEmployeeNameToBeVisible(USER_CREATE_MOCK.name);
    await employeesPage.expectEmployeeSurnameToBeVisible(
      USER_CREATE_MOCK.surname
    );

    await query('DELETE FROM "user" WHERE "email" = $1', [
      USER_CREATE_MOCK.email,
    ]);
  });

  test("[ST-8] Update employee", async ({ page }) => {
    await page.goto(`${APP_URL}/workspace-hub/employees`);

    const employeesPage = new EmployeesPage(page);

    await employeesPage.openAddNewEmployeeDialog();
    await employeesPage.createNewEmployee(USER_CREATE_MOCK);

    await employeesPage.filterEmployees(USER_CREATE_MOCK.name);
    await page.waitForTimeout(2000);
    await employeesPage.goToEmployeePage(
      USER_CREATE_MOCK.name + " " + USER_CREATE_MOCK.surname
    );
    await employeesPage.updateEmployee(USER_UPDATE_MOCK);
    await page.waitForTimeout(2000);

    await employeesPage.expectEmployeeNameToBeVisible(USER_UPDATE_MOCK.name);

    await query('DELETE FROM "user" WHERE "email" = $1', [
      USER_CREATE_MOCK.email,
    ]);
  });

  test("[ST-8] Create project", async ({ page }) => {
    await page.goto(`${APP_URL}/workspace-hub/projects`);

    const projectsPage = new ProjectsPage(page);

    await projectsPage.openAddNewProjectDialog();
    await projectsPage.createNewProject(PROJECT_CREATE_MOCK);

    const projectLocator = projectsPage.getProjectInProjectTable(
      PROJECT_CREATE_MOCK.name
    );
    await expect(projectLocator).toHaveText(PROJECT_CREATE_MOCK.name);

    await query('DELETE FROM "project" WHERE "name" = $1', [
      PROJECT_CREATE_MOCK.name,
    ]);
  });
});
