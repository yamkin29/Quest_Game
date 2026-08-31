import type { GameState } from "./types";

export function createInitialGameState(): GameState {
  return {
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
  };
}

export function restartGame(): GameState {
  return createInitialGameState();
}
