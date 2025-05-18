import { test } from "./global/global-hooks";
import { expect, Page } from "@playwright/test";
import { join } from "path";
import {
  USER_ENTITY,
  ADMIN_ENTITY,
  SUPERVISOR_ENTITY,
} from "./mocks/user.mocks";
import { UserEntity } from "api/src/libs/db/entities/user.entity";
import { checkIfTokensSet } from "./helpers/auth-helper";

const authDir = "./playwright-tests/.auth";
const authFiles = {
  user: join(authDir, "user.json"),
  supervisor: join(authDir, "supervisor.json"),
  admin: join(authDir, "admin.json"),
};

const validateUser = async (page: Page, expectedUser: UserEntity) => {
  const user = await page.evaluate(() => localStorage.getItem("user"));
  if (!user) {
    throw new Error("User data is missing from localStorage.");
  }

  try {
    const jsonString = JSON.parse(user);
    expect(jsonString.email).toBe(expectedUser.email);
  } catch (error) {
    console.error("Error parsing user JSON:", error);
  }
};

const goToWorkspaceSelection = async (page: Page) => {
  await page.goto("http://localhost:5173/auth/select-workspace");
  await page.waitForLoadState("domcontentloaded");

  const { token, user, refreshToken } = await page.evaluate(() => {
    return {
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user"),
      refreshToken: localStorage.getItem("refreshToken"),
    };
  });

  const selectWorkspaceTitle = page.getByTestId("select-workspace-title");
  await expect(selectWorkspaceTitle).toBeVisible();
};

test.describe(`User test`, () => {
  test.use({ storageState: authFiles.user });

  test(`User can authenticate and access listed workspaces`, async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.waitForLoadState("domcontentloaded");

    const areTokensSet = await checkIfTokensSet(page);
    expect(areTokensSet).toBe(true);

    await validateUser(page, USER_ENTITY);
  });
});

test.describe(`Supervisor test`, () => {
  test.use({ storageState: authFiles.supervisor });

  test(`Supervisor can authenticate and access listed workspaces`, async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.waitForLoadState("domcontentloaded");

    const areTokensSet: boolean = await checkIfTokensSet(page);
    expect(areTokensSet).toBe(true);

    await validateUser(page, SUPERVISOR_ENTITY);
  });
});

test.describe(`Admin test`, () => {
  test.use({ storageState: authFiles.admin });

  test(`Admin can authenticate and access listed workspaces`, async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");
    await page.waitForLoadState("domcontentloaded");

    const areTokensSet: boolean = await checkIfTokensSet(page);
    expect(areTokensSet).toBe(true);

    await validateUser(page, ADMIN_ENTITY);
  });
});
