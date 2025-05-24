import { test } from "@playwright/test";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { loginWithGoogleToken } from "./helpers/auth-helper";
import { BusinessTripForm } from "./pages/business-trip-form";
import { RequestsPage } from "./pages/requests-page";

dotenv.config({ path: resolve(__dirname, ".env") });

const APP_URL = "http://localhost:5173";

test.describe("Supervisor SkillTrack tests", () => {
  test("[ST-17] Submitting and approving requests", async ({ browser }) => {
    // Request business trip as user
    const userContext = await browser.newContext();
    const userPage = await userContext.newPage();
    await loginWithGoogleToken(userPage, process.env.GOOGLE_IDTOKEN_USER!);

    await userPage.goto(`${APP_URL}/user-hub/dashboard`);

    const businessTripForm = new BusinessTripForm(userPage);
    await businessTripForm.openMoreToReportDialog();
    const activityId = await businessTripForm.createBusinessTrip();

    // Log in as supervisor and approve request
    const supervisorContext = await browser.newContext();
    const supervisorPage = await supervisorContext.newPage();
    await loginWithGoogleToken(
      supervisorPage,
      process.env.GOOGLE_IDTOKEN_SUPERVISOR!
    );

    await supervisorPage.goto(`${APP_URL}/user-hub/requests`);

    const requestsPage = new RequestsPage(supervisorPage);
    await requestsPage.approveRequestById(activityId);
  });
});
