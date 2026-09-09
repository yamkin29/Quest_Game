import { createInitialGameState } from "./createInitialState";
import { submitCommand } from "./submitCommand";
import type { GameState } from "./types";

const TO_STARSHIP_SCENE: readonly string[] = ["", "", "", "", "", ""];
const TO_RIDDLE_ANSWER: readonly string[] = [
  ...TO_STARSHIP_SCENE,
  "1",
  "",
  "2",
  "",
  "2",
  "",
  "1",
  "",
  "3",
  "",
  "2",
  "",
  "2",
];
const TO_FINISHED: readonly string[] = [
  ...TO_RIDDLE_ANSWER,
  "отражение",
  "",
  "2",
  "",
  "2",
];

export function buildState(commands: readonly string[]): GameState {
  return commands.reduce<GameState>(
    (state, command) => submitCommand(state, command),
    createInitialGameState(),
  );
}

export function buildFirstSceneState(): GameState {
  return buildState(TO_STARSHIP_SCENE);
}

export function buildRiddleState(): GameState {
  return buildState(TO_RIDDLE_ANSWER);
}

export function buildFinishedState(): GameState {
  return buildState(TO_FINISHED);
}
