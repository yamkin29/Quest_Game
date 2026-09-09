import { expect, test } from "@playwright/test";

import { t, VICTORY_ROUTE } from "./helpers";

test("the game is fully playable from the keyboard", async ({ page }) => {
  await page.goto("/");

  const input = page.getByLabel(t("console.inputLabel"));

  await expect(input).toBeFocused();

  for (const command of VICTORY_ROUTE) {
    if (command) {
      await input.pressSequentially(command);
    }
    await page.keyboard.press("Enter");
  }

  await expect(page.getByText(t("ending.victory"))).toBeVisible();
  await expect(
    page.getByRole("button", { name: t("console.action.restart") }),
  ).toBeFocused();
});
