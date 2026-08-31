export type Locale = "ru" | "en";

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
