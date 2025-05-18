import { Page } from "@playwright/test";
import { join } from "path";

const authDir = "./playwright-tests/.auth";
export const authFiles = {
  user: join(authDir, "user.json"),
  supervisor: join(authDir, "supervisor.json"),
  admin: join(authDir, "admin.json"),
};
interface ResponseBody {
  accessToken: string;
  refreshToken: string;
}

export const checkIfTokensSet = async (page: Page): Promise<boolean> => {
  return await page.evaluate((): boolean => {
    return (
      localStorage.getItem("token") !== null &&
      localStorage.getItem("refreshToken") !== null
    );
  });
};

export const getAccessToken = async (page: Page): Promise<string | null> => {
  return await page.evaluate((): string | null => {
    return localStorage.getItem("token");
  });
};

export async function explicitlyUpdateTokens(page: Page, apiUrl: string) {
  const { refreshToken: gotRefreshToken, accessToken: gotAccessToken } =
    await getBothTokens(page);
  await refreshTokens(page, apiUrl, gotRefreshToken, gotAccessToken);
}

export async function getBothTokens(
  page: Page
): Promise<{ accessToken: string; refreshToken: string }> {
  return await page.evaluate(
    (): { accessToken: string; refreshToken: string } => {
      return {
        accessToken: localStorage.getItem("token")!,
        refreshToken: localStorage.getItem("refreshToken")!,
      };
    }
  );
}

async function refreshTokens(
  page: Page,
  API_URL: string,
  refreshToken: string,
  accessToken: string,
  selectedUser: keyof typeof authFiles = "admin"
): Promise<{ accessToken: string; refreshToken: string }> {
  const refreshResponse = await page.request.post(
    `${API_URL}/api/auth/users/refresh`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      data: { refreshToken: refreshToken },
    }
  );

  const responseBody = await refreshResponse.json();
  const authFile = authFiles[selectedUser];
  const context = page.context();

  await page.evaluate(
    ({ accessToken, refreshToken }: ResponseBody) => {
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
    {
      accessToken: responseBody.accessToken,
      refreshToken: responseBody.refreshToken,
    }
  );
  await context.storageState({ path: authFile });
  await context.close();

  return {
    refreshToken: responseBody.refreshToken,
    accessToken: responseBody.accessToken,
  };
}
