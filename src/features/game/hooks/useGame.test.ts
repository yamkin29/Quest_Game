import { describe, expect, it } from "vitest";

import { createInitialGameState } from "../engine/createInitialState";
import { submitCommand } from "../engine/submitCommand";
import { gameReducer } from "./useGame";

describe("gameReducer", () => {
  it("delegates commands to the pure game engine", () => {
    const state = createInitialGameState();

    expect(gameReducer(state, { type: "submit", command: "" })).toEqual(
      submitCommand(state, ""),
    );
  });

  it("creates a fresh state for the restart action", () => {
    const state = submitCommand(createInitialGameState(), "");
    const restarted = gameReducer(state, { type: "restart" });

    expect(restarted).toEqual(createInitialGameState());
    expect(restarted).not.toBe(state);
    expect(restarted.messages).not.toBe(state.messages);
  });
});
