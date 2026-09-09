import { expect, test } from "@playwright/test";

import { t } from "./helpers";

test("switches theme and persists it across reloads", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );

  await page.getByRole("button", { name: t("theme.switchToDark") }).click();

  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "dark",
  );

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "dark",
  );

  await page.getByRole("button", { name: t("theme.switchToLight") }).click();

  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );
});
