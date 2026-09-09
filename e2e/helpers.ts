import { expect, type Locator, type Page } from "@playwright/test";

import { en } from "../src/shared/i18n/en";

export const t = (key: keyof typeof en) => en[key];

export async function sendCommand(page: Page, command: string) {
  const input = page.getByLabel(t("console.inputLabel"));

  if (command) {
    await input.fill(command);
  }

  await input.press("Enter");
}

export function historyLines(page: Page): Locator {
  return page.getByRole("log").locator("p");
}

export async function expectLastLine(page: Page, text: string) {
  await expect(historyLines(page).last()).toHaveText(text);
}

export const VICTORY_ROUTE: readonly string[] = [
  "",
  "",
  "",
  "",
  "",
  "", // intro → starship
  "1",
  "", // leave the ship → temple
  "2",
  "", // living room
  "2",
  "", // find the key
  "1",
  "", // back to the temple
  "3",
  "", // the old door opens → danger room
  "2",
  "", // run to the light → quest room
  "2", // inspect the lock → riddle answer
  "отражение",
  "", // solve the riddle → other ship
  "2",
  "", // take the power module, still on the other ship
  "1",
  "", // back to the quest room
  "1",
  "", // back to the danger room
  "1",
  "", // back to the temple
  "1",
  "", // back to the starship
  "2", // get off the planet → victory
];

export const DEATH_ROUTE: readonly string[] = [
  "",
  "",
  "",
  "",
  "",
  "", // intro → starship
  "1",
  "", // leave the ship → temple
  "2",
  "", // living room
  "2",
  "", // find the key
  "1",
  "", // back to the temple
  "3",
  "", // the old door opens → danger room
  "3", // search the darkness → death
];
