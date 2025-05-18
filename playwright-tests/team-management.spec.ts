import { test } from "./global/global-hooks";
import { authFiles } from "./helpers/auth-helper";
import { USER_ENTITY } from "./mocks/user.mocks";
import { EmployeesPage } from "./pages/employees-page";

const APP_URL = "http://localhost:5173";

test.describe("Employees page", () => {
  test.use({ storageState: authFiles.supervisor });

  test("Access to employees", async ({ page }) => {
    await page.goto(`${APP_URL}/workspace-hub/employees`);

    const employeeFullName = USER_ENTITY.name + " " + USER_ENTITY.surname;
    const employeesPage = new EmployeesPage(page);
    await employeesPage.goToEmployeePage(employeeFullName);
    await page.waitForTimeout(2000);

    await employeesPage.expectEmployeeNameToBeVisible(employeeFullName);
  });
});
