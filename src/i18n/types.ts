import type { GameMessageKey } from "../features/game/engine/types";

export type Locale = "ru" | "en";

export type InterfaceMessageKey =
  | "app.title"
  | "app.stageReady"
  | "app.description"
  | "app.technologyStack"
  | "header.status.playing"
  | "header.status.won"
  | "header.status.dead"
  | "footer.description"
  | "footer.copyright"
  | "console.title"
  | "console.historyLabel"
  | "console.inputLabel"
  | "console.placeholder.continue"
  | "console.placeholder.choice"
  | "console.placeholder.answer"
  | "console.placeholder.finished"
  | "console.action.continue"
  | "console.action.submit"
  | "console.action.answer"
  | "console.action.restart"
  | "locale.label"
  | "locale.ru"
  | "locale.en"
  | "theme.switchToDark"
  | "theme.switchToLight";

export type MessageKey = GameMessageKey | InterfaceMessageKey;

export type TranslationParams = Readonly<Record<string, string | number>>;

export type Translator = (
  key: MessageKey,
  params?: TranslationParams,
) => string;

export type TranslationDictionary = Readonly<Record<MessageKey, string>>;
