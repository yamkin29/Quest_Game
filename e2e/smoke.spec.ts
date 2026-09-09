import { expect, test } from "@playwright/test";

import { t } from "./helpers";

test("opens the terminal without console errors", async ({ page }) => {
  const errors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      errors.push(message.text());
    }
  });
  page.on("pageerror", (error) => {
    errors.push(error.message);
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: t("console.title") }),
  ).toBeVisible();
  await expect(page.getByRole("log")).toBeVisible();
  await expect(page.getByText(t("intro.awakening"))).toBeVisible();

  expect(errors).toEqual([]);
});
