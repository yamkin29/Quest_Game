// @vitest-environment jsdom
import { describe, expect, it } from "vitest";

import { colorSchemeManager } from "./colorSchemeManager";

const STORAGE_KEY = "quest-game.color-scheme.v1";

describe("colorSchemeManager", () => {
  it("persists the chosen scheme under the game storage key", () => {
    colorSchemeManager.set("dark");

    expect(localStorage.getItem(STORAGE_KEY)).toBe("dark");
    expect(colorSchemeManager.get("light")).toBe("dark");
  });

  it("switches between light and dark", () => {
    colorSchemeManager.set("dark");
    colorSchemeManager.set("light");

    expect(colorSchemeManager.get("dark")).toBe("light");
  });

  it("falls back to the default when storage holds garbage", () => {
    localStorage.setItem(STORAGE_KEY, "neon-pink");

    expect(colorSchemeManager.get("light")).toBe("light");
  });

  it("clears the persisted scheme", () => {
    colorSchemeManager.set("dark");
    colorSchemeManager.clear();

    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    expect(colorSchemeManager.get("light")).toBe("light");
  });
});
