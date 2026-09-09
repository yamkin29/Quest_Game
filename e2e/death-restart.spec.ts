import { expect, test } from "@playwright/test";

import { DEATH_ROUTE, sendCommand, t } from "./helpers";

test("the player can die and start over", async ({ page }) => {
  await page.goto("/");

  for (const command of DEATH_ROUTE) {
    await sendCommand(page, command);
  }

  await expect(page.getByText(t("ending.death"))).toBeVisible();
  await expect(page.getByText(t("header.status.dead"))).toBeVisible();

  await page.getByRole("button", { name: t("console.action.restart") }).click();

  await expect(page.getByText(t("intro.awakening"))).toBeVisible();
  await expect(page.getByText(t("header.status.playing"))).toBeVisible();
});
