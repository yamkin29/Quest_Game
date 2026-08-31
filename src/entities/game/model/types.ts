import type {
  ChoiceMessageKey,
  ErrorMessageKey,
  InputMessageKey,
  StoryMessageKey,
  SystemMessageKey,
} from "@/shared/i18n";

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
