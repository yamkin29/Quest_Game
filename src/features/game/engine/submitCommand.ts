import { createInitialGameState } from "./createInitialState";
import { getScene } from "./getScene";
import type { GameState, MessageDraft, StoryMessageKey } from "./types";

export const RESTART_COMMAND = "restart";

const riddleAnswers = new Set(["отражение", "reflection"]);

const introduction: readonly StoryMessageKey[] = [
  "intro.awakening",
  "intro.belt",
  "intro.fall",
  "intro.memory",
  "intro.patrol",
  "intro.gravity",
  "intro.crash",
];

export function submitCommand(state: GameState, command: string): GameState {
  if (state.status !== "playing") {
    return submitFinishedCommand(state, command);
  }

  switch (state.inputMode) {
    case "continue":
      return continueGame(state);
    case "choice":
      return submitChoice(state, command);
    case "answer":
      return submitRiddleAnswer(state, command);
    case "finished":
      return state;
  }
}

function continueGame(state: GameState): GameState {
  if (state.sceneStep < introduction.length - 1) {
    const nextStep = state.sceneStep + 1;
    const nextKey = introduction[nextStep];

    if (nextKey === undefined) {
      return state;
    }

    const withIntroduction = appendMessages(state, [
      { key: nextKey, kind: "story" },
    ]);

    if (nextStep === introduction.length - 1) {
      return enterCurrentScene({ ...withIntroduction, sceneStep: nextStep });
    }

    return { ...withIntroduction, sceneStep: nextStep };
  }

  return enterCurrentScene(state);
}

function enterCurrentScene(state: GameState): GameState {
  const scene = getScene(state);
  const sceneMessages: MessageDraft[] = [
    { key: scene.descriptionKey, kind: "story" },
    ...scene.options.map((option) => ({
      key: option.labelKey,
      kind: "choice" as const,
      params: { option: option.value },
    })),
  ];

  return appendMessages({ ...state, inputMode: "choice" }, sceneMessages);
}

function submitChoice(state: GameState, command: string): GameState {
  const scene = getScene(state);
  const option = Number(command.trim());
  const isAvailable =
    Number.isInteger(option) &&
    scene.options.some((sceneOption) => sceneOption.value === option);

  const withInput = appendInput(state, command);

  if (!isAvailable) {
    return appendMessages(withInput, [
      {
        key: "error.invalidChoice",
        kind: "error",
        params: { options: scene.options.map(({ value }) => value).join(", ") },
      },
    ]);
  }

  return applyChoice(withInput, option);
}

function applyChoice(state: GameState, option: number): GameState {
  switch (state.room) {
    case "starship":
      if (option === 1) {
        return transitionTo(state, "temple", "starship.leave");
      }

      return finishGame(state, "won", "ending.victory");

    case "temple":
      if (option === 1) {
        return transitionTo(state, "starship", "temple.returnToShip");
      }

      if (option === 2) {
        return transitionTo(state, "livingRoom", "temple.enterLivingRoom");
      }

      return inspectOldDoor(state);

    case "livingRoom":
      if (option === 1) {
        return transitionTo(state, "temple", "livingRoom.returnToTemple");
      }

      return appendMessages({ ...state, hasKey: true, inputMode: "continue" }, [
        { key: "livingRoom.findKey", kind: "story" },
      ]);

    case "dangerRoom":
      if (option === 1) {
        return transitionTo(state, "temple", "dangerRoom.returnToTemple");
      }

      if (option === 2) {
        return transitionTo(state, "questRoom", "dangerRoom.enterQuestRoom");
      }

      return finishGame(state, "dead", "ending.death");

    case "questRoom":
      if (option === 1) {
        return transitionTo(
          state,
          "dangerRoom",
          "questRoom.returnToDangerRoom",
        );
      }

      return appendMessages({ ...state, inputMode: "answer" }, [
        { key: "riddle.introduction", kind: "story" },
        { key: "riddle.question", kind: "story" },
      ]);

    case "otherShip":
      if (option === 1) {
        return transitionTo(state, "questRoom", "otherShip.returnToQuestRoom");
      }

      return appendMessages(
        { ...state, hasModule: true, inputMode: "continue" },
        [{ key: "otherShip.takeModule", kind: "story" }],
      );
  }
}

function inspectOldDoor(state: GameState): GameState {
  if (!state.hasKey) {
    return appendMessages({ ...state, inputMode: "continue" }, [
      { key: "temple.inspectOldDoor", kind: "story" },
      { key: "temple.oldDoorLocked", kind: "story" },
    ]);
  }

  return appendMessages(
    { ...state, room: "dangerRoom", inputMode: "continue" },
    [
      { key: "temple.inspectOldDoor", kind: "story" },
      { key: "temple.oldDoorOpened", kind: "story" },
    ],
  );
}

function submitRiddleAnswer(state: GameState, command: string): GameState {
  const withInput = appendInput(state, command);
  const answer = command.trim().toLocaleLowerCase();

  if (!riddleAnswers.has(answer)) {
    return appendMessages(withInput, [
      { key: "error.incorrectRiddleAnswer", kind: "error" },
    ]);
  }

  return appendMessages(
    { ...withInput, room: "otherShip", inputMode: "continue" },
    [{ key: "riddle.solved", kind: "story" }],
  );
}

function submitFinishedCommand(state: GameState, command: string): GameState {
  if (command.trim().toLocaleLowerCase("en-US") === RESTART_COMMAND) {
    return createInitialGameState();
  }

  return appendMessages(appendInput(state, command), [
    { key: "error.gameFinished", kind: "error" },
  ]);
}

function transitionTo(
  state: GameState,
  room: GameState["room"],
  key: StoryMessageKey,
): GameState {
  return appendMessages({ ...state, room, inputMode: "continue" }, [
    { key, kind: "story" },
  ]);
}

function finishGame(
  state: GameState,
  status: Extract<GameState["status"], "won" | "dead">,
  key: StoryMessageKey,
): GameState {
  return appendMessages({ ...state, status, inputMode: "finished" }, [
    { key, kind: "story" },
    { key: "system.restartAvailable", kind: "system" },
  ]);
}

function appendInput(state: GameState, command: string): GameState {
  return appendMessages(state, [
    {
      key: "input.command",
      kind: "input",
      params: { value: command },
    },
  ]);
}

function appendMessages(
  state: GameState,
  drafts: readonly MessageDraft[],
): GameState {
  let nextMessageId = state.nextMessageId;
  const messages = drafts.map((draft) => {
    const message = {
      ...draft,
      id: `message-${nextMessageId}`,
    };

    nextMessageId += 1;
    return message;
  });

  return {
    ...state,
    messages: [...state.messages, ...messages],
    nextMessageId,
  };
}
