import { expect, test } from "@playwright/test";

import { sendCommand, t, VICTORY_ROUTE } from "./helpers";

test("the player can win the game and restart", async ({ page }) => {
  await page.goto("/");

  for (const command of VICTORY_ROUTE) {
    await sendCommand(page, command);
  }

  await expect(page.getByText(t("ending.victory"))).toBeVisible();
  await expect(page.getByText(t("header.status.won"))).toBeVisible();

  await page.getByRole("button", { name: t("console.action.restart") }).click();

  await expect(page.getByText(t("intro.awakening"))).toBeVisible();
  await expect(page.getByText(t("header.status.playing"))).toBeVisible();
});
