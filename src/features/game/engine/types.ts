export type Room =
  | "starship"
  | "temple"
  | "livingRoom"
  | "dangerRoom"
  | "questRoom"
  | "otherShip";

export type GameStatus = "playing" | "won" | "dead";

export type InputMode = "continue" | "choice" | "answer" | "finished";

export type MessageKind = "story" | "choice" | "input" | "system" | "error";

export type StoryMessageKey =
  | "intro.awakening"
  | "intro.belt"
  | "intro.fall"
  | "intro.memory"
  | "intro.patrol"
  | "intro.gravity"
  | "intro.crash"
  | "starship.description"
  | "starship.leave"
  | "temple.description"
  | "temple.returnToShip"
  | "temple.enterLivingRoom"
  | "temple.inspectOldDoor"
  | "temple.oldDoorLocked"
  | "temple.oldDoorOpened"
  | "livingRoom.description"
  | "livingRoom.returnToTemple"
  | "livingRoom.findKey"
  | "dangerRoom.description"
  | "dangerRoom.returnToTemple"
  | "dangerRoom.enterQuestRoom"
  | "questRoom.description"
  | "questRoom.returnToDangerRoom"
  | "riddle.introduction"
  | "riddle.question"
  | "riddle.solved"
  | "otherShip.description"
  | "otherShip.returnToQuestRoom"
  | "otherShip.takeModule"
  | "ending.death"
  | "ending.victory";

export type ChoiceMessageKey =
  | "starship.choice.leave"
  | "starship.choice.escape"
  | "temple.choice.returnToShip"
  | "temple.choice.enterLivingRoom"
  | "temple.choice.inspectOldDoor"
  | "livingRoom.choice.returnToTemple"
  | "livingRoom.choice.search"
  | "dangerRoom.choice.returnToTemple"
  | "dangerRoom.choice.runToLight"
  | "dangerRoom.choice.searchDarkness"
  | "questRoom.choice.returnToDangerRoom"
  | "questRoom.choice.inspectLock"
  | "otherShip.choice.returnToQuestRoom"
  | "otherShip.choice.inspectModule";

export type InputMessageKey = "input.command";

export type SystemMessageKey = "system.restartAvailable";

export type ErrorMessageKey =
  | "error.invalidChoice"
  | "error.incorrectRiddleAnswer"
  | "error.gameFinished";

export type GameMessageKey =
  | StoryMessageKey
  | ChoiceMessageKey
  | InputMessageKey
  | SystemMessageKey
  | ErrorMessageKey;

export type MessageParams = Readonly<Record<string, string | number>>;

interface MessageBase {
  readonly id: string;
  readonly params?: MessageParams;
}

export type GameMessage =
  | (MessageBase & { readonly kind: "story"; readonly key: StoryMessageKey })
  | (MessageBase & { readonly kind: "choice"; readonly key: ChoiceMessageKey })
  | (MessageBase & { readonly kind: "input"; readonly key: InputMessageKey })
  | (MessageBase & { readonly kind: "system"; readonly key: SystemMessageKey })
  | (MessageBase & { readonly kind: "error"; readonly key: ErrorMessageKey });

type WithoutId<T> = T extends unknown ? Omit<T, "id"> : never;

export type MessageDraft = WithoutId<GameMessage>;

export interface GameState {
  readonly room: Room;
  readonly status: GameStatus;
  readonly inputMode: InputMode;
  readonly sceneStep: number;
  readonly hasKey: boolean;
  readonly hasModule: boolean;
  readonly messages: readonly GameMessage[];
  readonly nextMessageId: number;
}

export interface SceneOption {
  readonly value: number;
  readonly labelKey: ChoiceMessageKey;
}

export interface SceneDefinition {
  readonly descriptionKey: StoryMessageKey;
  readonly options: readonly SceneOption[];
}
