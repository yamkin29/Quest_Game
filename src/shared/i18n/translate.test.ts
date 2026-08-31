import { describe, expect, it } from "vitest";

import { translate } from "./translate";

describe("translate", () => {
  it("resolves both locales through the public API", () => {
    expect(translate("ru", "header.status.playing")).toBe("Игра запущена");
    expect(translate("en", "header.status.playing")).toBe("Game running");
  });

  it("interpolates string and number parameters", () => {
    expect(translate("ru", "starship.choice.leave", { option: 1 })).toBe(
      "1. Выйти из корабля.",
    );
    expect(translate("en", "error.invalidChoice", { options: "1, 2" })).toBe(
      "Invalid choice. Available options: 1, 2.",
    );
  });

  it("preserves an unresolved placeholder so translation mistakes stay visible", () => {
    expect(translate("en", "input.command")).toBe("> {{value}}");
  });
});
