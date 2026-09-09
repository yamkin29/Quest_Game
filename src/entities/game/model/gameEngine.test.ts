import { describe, expect, it } from "vitest";

import { createInitialGameState, restartGame } from "./createInitialState";
import { getScene } from "./getScene";
import { RESTART_COMMAND, submitCommand } from "./submitCommand";
import type { GameState } from "./types";

describe("game engine", () => {
  it("creates the initial immutable game state", () => {
    const state = createInitialGameState();
    const nextState = submitCommand(state, "");

    expect(state).toEqual({
      room: "starship",
      status: "playing",
      inputMode: "continue",
      sceneStep: 0,
      hasKey: false,
      hasModule: false,
      messages: [
        {
          id: "message-1",
          key: "intro.awakening",
          kind: "story",
        },
      ],
      nextMessageId: 2,
    });
    expect(nextState).not.toBe(state);
    expect(nextState.messages).not.toBe(state.messages);
    expect(state.sceneStep).toBe(0);
  });

  it("completes the full victory route", () => {
    let state = reachStarship();

    state = choose(state, "1");
    state = continueToScene(state, "temple");
    state = choose(state, "2");
    state = continueToScene(state, "livingRoom");
    state = choose(state, "2");

    expect(state.hasKey).toBe(true);

    state = continueToScene(state, "livingRoom");
    state = choose(state, "1");
    state = continueToScene(state, "temple");
    state = choose(state, "3");
    state = continueToScene(state, "dangerRoom");
    state = choose(state, "2");
    state = continueToScene(state, "questRoom");
    state = choose(state, "2");

    expect(state.inputMode).toBe("answer");

    state = submitCommand(state, "  ОТРАЖЕНИЕ  ");
    state = continueToScene(state, "otherShip");
    state = choose(state, "2");

    expect(state.hasModule).toBe(true);

    state = continueToScene(state, "otherShip");
    state = choose(state, "1");
    state = continueToScene(state, "questRoom");
    state = choose(state, "1");
    state = continueToScene(state, "dangerRoom");
    state = choose(state, "1");
    state = continueToScene(state, "temple");
    state = choose(state, "1");
    state = continueToScene(state, "starship");
    state = choose(state, "2");

    expect(state.status).toBe("won");
    expect(state.inputMode).toBe("finished");
    expect(state.messages.at(-2)?.key).toBe("ending.victory");
    expect(state.messages.at(-1)?.key).toBe("system.restartAvailable");
  });

  it("reaches the death ending when the player searches the darkness", () => {
    let state = reachDangerRoom();

    state = choose(state, "3");

    expect(state.status).toBe("dead");
    expect(state.inputMode).toBe("finished");
    expect(state.messages.at(-2)?.key).toBe("ending.death");
  });

  it("reports invalid choices without changing game progress", () => {
    const state = reachStarship();
    const originalProgress = getProgress(state);

    const nextState = submitCommand(state, "2");

    expect(getProgress(nextState)).toEqual(originalProgress);
    expect(state.messages).toHaveLength(9);
    expect(nextState.messages).toHaveLength(11);
    expect(nextState.messages.at(-1)).toMatchObject({
      key: "error.invalidChoice",
      kind: "error",
      params: { options: "1" },
    });
  });

  it("keeps the old door locked until the key is found", () => {
    let state = reachStarship();
    state = choose(state, "1");
    state = continueToScene(state, "temple");
    state = choose(state, "3");

    expect(state.room).toBe("temple");
    expect(state.hasKey).toBe(false);
    expect(state.inputMode).toBe("continue");
    expect(state.messages.at(-1)?.key).toBe("temple.oldDoorLocked");
  });

  it("keeps asking the riddle until the correct answer is submitted", () => {
    const state = reachRiddle();
    const nextState = submitCommand(state, "тень");

    expect(getProgress(nextState)).toEqual(getProgress(state));
    expect(nextState.inputMode).toBe("answer");
    expect(nextState.messages.at(-1)?.key).toBe("error.incorrectRiddleAnswer");
  });

  it("changes available options after inventory items are collected", () => {
    expect(
      getScene({ room: "livingRoom", hasKey: false, hasModule: false }).options,
    ).toHaveLength(2);
    expect(
      getScene({ room: "livingRoom", hasKey: true, hasModule: false }).options,
    ).toHaveLength(1);
    expect(
      getScene({ room: "starship", hasKey: true, hasModule: true }).options,
    ).toHaveLength(2);
  });

  it("restarts a finished game with both the function and command API", () => {
    const deadState = choose(reachDangerRoom(), "3");

    expect(restartGame()).toEqual(createInitialGameState());
    expect(submitCommand(deadState, RESTART_COMMAND)).toEqual(
      createInitialGameState(),
    );

    const unchangedProgress = submitCommand(deadState, "1");
    expect(unchangedProgress.status).toBe("dead");
    expect(unchangedProgress.messages.at(-1)?.key).toBe("error.gameFinished");
  });
});

describe("engine input validation", () => {
  it("accepts a choice padded with whitespace", () => {
    const state = choose(reachStarship(), " 1 ");

    expect(state.room).toBe("temple");
  });

  it("rejects malformed choices without changing progress", () => {
    for (const command of ["abc", "1.5", "2.0", "-1", "0", ""]) {
      const state = reachStarship();
      const nextState = submitCommand(state, command);

      expect(getProgress(nextState)).toEqual(getProgress(state));
      expect(nextState.messages.at(-1)).toMatchObject({
        key: "error.invalidChoice",
        params: { options: "1" },
      });
      expect(nextState.nextMessageId).toBe(nextState.messages.length + 1);
    }
  });

  it("accepts the riddle answer regardless of case and spacing", () => {
    for (const answer of ["отражение", " Reflection ", "ОТРАЖЕНИЕ"]) {
      const nextState = submitCommand(reachRiddle(), answer);

      expect(nextState.room).toBe("otherShip");
      expect(nextState.inputMode).toBe("continue");
      expect(nextState.messages.at(-1)?.key).toBe("riddle.solved");
    }
  });

  it("restarts a finished game with a padded restart command", () => {
    const deadState = choose(reachDangerRoom(), "3");

    expect(submitCommand(deadState, "  restart  ")).toEqual(
      createInitialGameState(),
    );
  });

  it("logs the echoed input and an error once the game is finished", () => {
    const deadState = choose(reachDangerRoom(), "3");
    const nextState = submitCommand(deadState, "hello");

    expect(nextState.status).toBe("dead");
    expect(nextState.messages.at(-2)).toMatchObject({
      key: "input.command",
      params: { value: "hello" },
    });
    expect(nextState.messages.at(-1)?.key).toBe("error.gameFinished");
  });

  it("keeps the previous state object untouched by invalid input", () => {
    const state = reachStarship();

    submitCommand(state, "not-a-choice");

    expect(state.inputMode).toBe("choice");
    expect(state.messages).toHaveLength(9);
  });
});

function reachStarship(): GameState {
  let state = createInitialGameState();

  while (state.inputMode === "continue") {
    state = submitCommand(state, "");
  }

  return state;
}

function reachDangerRoom(): GameState {
  let state = reachStarship();
  state = choose(state, "1");
  state = continueToScene(state, "temple");
  state = choose(state, "2");
  state = continueToScene(state, "livingRoom");
  state = choose(state, "2");
  state = continueToScene(state, "livingRoom");
  state = choose(state, "1");
  state = continueToScene(state, "temple");
  state = choose(state, "3");
  return continueToScene(state, "dangerRoom");
}

function reachRiddle(): GameState {
  let state = reachDangerRoom();
  state = choose(state, "2");
  state = continueToScene(state, "questRoom");
  return choose(state, "2");
}

function choose(state: GameState, value: string): GameState {
  expect(state.inputMode).toBe("choice");
  return submitCommand(state, value);
}

function continueToScene(state: GameState, room: GameState["room"]): GameState {
  expect(state.room).toBe(room);
  expect(state.inputMode).toBe("continue");

  const nextState = submitCommand(state, "");
  expect(nextState.inputMode).toBe("choice");
  return nextState;
}

function getProgress(state: GameState) {
  return {
    room: state.room,
    status: state.status,
    inputMode: state.inputMode,
    sceneStep: state.sceneStep,
    hasKey: state.hasKey,
    hasModule: state.hasModule,
  };
}
