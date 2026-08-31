import { describe, expect, it } from "vitest";

import { createInitialGameState } from "../features/game/engine/createInitialState";
import { submitCommand } from "../features/game/engine/submitCommand";
import type { GameState } from "../features/game/engine/types";
import {
  deserializeLocale,
  getDefaultLocale,
  isLocale,
} from "../hooks/useLanguage";
import { en } from "./en";
import { ru } from "./ru";
import { translate } from "./translate";

describe("typed translations", () => {
  it("keeps Russian and English dictionaries structurally identical", () => {
    expect([...Object.keys(en)].sort()).toEqual([...Object.keys(ru)].sort());
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

  it("renders the same stored history in either language", () => {
    const [message] = createInitialGameState().messages;

    expect(message).toBeDefined();

    if (message === undefined) {
      return;
    }

    expect(translate("ru", message.key, message.params)).toContain(
      "Ты смутно помнишь",
    );
    expect(translate("en", message.key, message.params)).toContain(
      "You barely remember",
    );
  });

  it("selects a supported browser locale and falls back to Russian", () => {
    expect(getDefaultLocale("en-US")).toBe("en");
    expect(getDefaultLocale("ru-RU")).toBe("ru");
    expect(getDefaultLocale("de-DE")).toBe("ru");
    expect(getDefaultLocale()).toBe("ru");
  });

  it("validates locale values restored from storage", () => {
    const browserFallback = getDefaultLocale(
      typeof navigator === "undefined" ? undefined : navigator.language,
    );

    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(deserializeLocale(JSON.stringify("en"))).toBe("en");
    expect(deserializeLocale(JSON.stringify("de"))).toBe(browserFallback);
    expect(deserializeLocale("invalid-json")).toBe(browserFallback);
  });

  it("accepts the localized English riddle answer", () => {
    const riddleState: GameState = {
      room: "questRoom",
      status: "playing",
      inputMode: "answer",
      sceneStep: 6,
      hasKey: true,
      hasModule: false,
      messages: [],
      nextMessageId: 1,
    };

    const nextState = submitCommand(riddleState, " Reflection ");

    expect(nextState.room).toBe("otherShip");
    expect(nextState.inputMode).toBe("continue");
    expect(nextState.messages.at(-1)?.key).toBe("riddle.solved");
  });
});
