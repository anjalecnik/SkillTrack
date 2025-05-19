import { test as setup } from "@playwright/test";
import { expect } from "@playwright/test";
import {
  USER_ENTITY,
  SUPERVISOR_ENTITY,
  ADMIN_ENTITY,
} from "./mocks/user.mocks";
import { query } from "./global/db-utils";
import * as fs from "fs";
import { join } from "path";
import { UserEntity } from "api/src/libs/db/entities/user.entity";

const authDir = "./playwright-tests/.auth";
const authFiles = {
  user: join(authDir, "user.json"),
  supervisor: join(authDir, "supervisor.json"),
  admin: join(authDir, "admin.json"),
};

if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

Object.values(authFiles).forEach((file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify({}), "utf8");
  }
});

interface UserDetails {
  email: string;
  name: string;
  picture: string;
}

interface ResponseBody {
  accessToken: string;
  refreshToken: string;
}

async function authenticateUser(
  browser: import("@playwright/test").Browser,
  user: UserEntity,
  authFile: string
): Promise<void> {
  const context = await browser.newContext();
  const page = await context.newPage();

  const dbResult1 = await query<{ email: string }>(
    'SELECT * FROM "user" WHERE "email" = $1',
    [user.email]
  );
  const postFix = dbResult1.rowCount > 0 ? "login" : "sign-up";

  const apiUrl = "http://localhost:8080";
  const apiPrefix = "api";
  const endpointUrl = `${apiUrl}/${apiPrefix}/auth/users/${postFix}`;

  const response = await page.request.post(endpointUrl, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: user.email,
      password: user.password,
    },
  });

  const responseBody: ResponseBody = await response.json();
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty("accessToken");
  expect(responseBody).toHaveProperty("refreshToken");

  await page.goto("http://localhost:5173");
  const userDetails: UserDetails = {
    email: user.email,
    name: user.email.split("@")[0],
    picture: "",
  };

  await page.evaluate(
    ({
      accessToken,
      refreshToken,
      userDetails,
    }: ResponseBody & { userDetails: string }) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", userDetails);
    },
    {
      accessToken: responseBody.accessToken,
      refreshToken: responseBody.refreshToken,
      userDetails: JSON.stringify(userDetails),
    }
  );
  await context.storageState({ path: authFile });
  await context.close();
}

setup("Authenticate User", async ({ browser }) => {
  await authenticateUser(browser, USER_ENTITY, authFiles.user);
});

setup("Authenticate Supervisor", async ({ browser }) => {
  await authenticateUser(browser, SUPERVISOR_ENTITY, authFiles.supervisor);
});

setup("Authenticate Admin", async ({ browser }) => {
  await authenticateUser(browser, ADMIN_ENTITY, authFiles.admin);
});
