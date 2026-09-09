import { expect, test } from "@playwright/test";

import { en } from "../src/shared/i18n/en";
import { ru } from "../src/shared/i18n/ru";

test("switches language and persists it across reloads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: en["console.title"] }),
  ).toBeVisible();

  await page.getByText("Русский", { exact: true }).click();

  await expect(
    page.getByRole("heading", { name: ru["console.title"] }),
  ).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("heading", { name: ru["console.title"] }),
  ).toBeVisible();

  await page.getByText("English", { exact: true }).click();

  await expect(
    page.getByRole("heading", { name: en["console.title"] }),
  ).toBeVisible();
});
