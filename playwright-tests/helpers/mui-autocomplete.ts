import { Page } from "@playwright/test";

export const selectMuiAutocompleteOption = async (
  dropdownSelector: string,
  optionName: string,
  page: Page
): Promise<void> => {
  await page.click(`[data-testid="${dropdownSelector}"]`);
  await page
    .getByRole("option", { name: optionName })
    .waitFor({ state: "attached" });
  await page.getByRole("option", { name: optionName }).click();
};
