import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

import { DEATH_ROUTE, sendCommand, VICTORY_ROUTE } from "./helpers";

async function seriousViolations(page: Page) {
  const results = await new AxeBuilder({ page }).analyze();

  return results.violations.filter(
    (violation) =>
      violation.impact === "critical" || violation.impact === "serious",
  );
}

test("start screen has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  expect(await seriousViolations(page)).toEqual([]);
});

test("mid-game screen has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  await sendCommand(page, "");

  expect(await seriousViolations(page)).toEqual([]);
});

test("game-over screen has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  for (const command of DEATH_ROUTE) {
    await sendCommand(page, command);
  }

  expect(await seriousViolations(page)).toEqual([]);
});

test("victory screen has no serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");

  for (const command of VICTORY_ROUTE) {
    await sendCommand(page, command);
  }

  expect(await seriousViolations(page)).toEqual([]);
});
