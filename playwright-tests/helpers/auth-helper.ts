import { Page } from "@playwright/test";

export async function loginWithGoogleToken(
  page: Page,
  idToken: string
): Promise<void> {
  const response = await page.request.post(
    "http://localhost:8080/api/auth/users/google/login",
    {
      headers: { "Content-Type": "application/json" },
      data: { idToken },
    }
  );

  const { accessToken, refreshToken } = await response.json();

  await page.goto("http://localhost:5173");

  await page.evaluate(
    ({ token, refreshToken }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
    },
    { token: accessToken, refreshToken }
  );
}
