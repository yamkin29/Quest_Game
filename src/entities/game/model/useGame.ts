import { useReducer } from "react";

import { createInitialGameState, restartGame } from "./createInitialState";
import { submitCommand } from "./submitCommand";
import type { GameState } from "./types";

export type GameAction =
  | { readonly type: "submit"; readonly command: string }
  | { readonly type: "restart" };

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "submit":
      return submitCommand(state, action.command);
    case "restart":
      return restartGame();
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState,
  );

  const submit = (command: string) => {
    dispatch({ type: "submit", command });
  };

  const restart = () => {
    dispatch({ type: "restart" });
  };

  return { state, submit, restart } as const;
}
