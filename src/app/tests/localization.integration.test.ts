import { describe, expect, it } from "vitest";

import {
  createInitialGameState,
  type GameState,
  submitCommand,
} from "@/entities/game";
import { translate } from "@/shared/i18n";

describe("game localization integration", () => {
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
