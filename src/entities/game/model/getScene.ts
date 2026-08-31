import type { GameState, SceneDefinition } from "./types";

type SceneState = Pick<GameState, "room" | "hasKey" | "hasModule">;

export function getScene(state: SceneState): SceneDefinition {
  switch (state.room) {
    case "starship":
      return {
        descriptionKey: "starship.description",
        options: [
          { value: 1, labelKey: "starship.choice.leave" },
          ...(state.hasModule
            ? [{ value: 2, labelKey: "starship.choice.escape" } as const]
            : []),
        ],
      };

    case "temple":
      return {
        descriptionKey: "temple.description",
        options: [
          { value: 1, labelKey: "temple.choice.returnToShip" },
          { value: 2, labelKey: "temple.choice.enterLivingRoom" },
          { value: 3, labelKey: "temple.choice.inspectOldDoor" },
        ],
      };

    case "livingRoom":
      return {
        descriptionKey: "livingRoom.description",
        options: [
          { value: 1, labelKey: "livingRoom.choice.returnToTemple" },
          ...(state.hasKey
            ? []
            : [{ value: 2, labelKey: "livingRoom.choice.search" } as const]),
        ],
      };

    case "dangerRoom":
      return {
        descriptionKey: "dangerRoom.description",
        options: [
          { value: 1, labelKey: "dangerRoom.choice.returnToTemple" },
          { value: 2, labelKey: "dangerRoom.choice.runToLight" },
          { value: 3, labelKey: "dangerRoom.choice.searchDarkness" },
        ],
      };

    case "questRoom":
      return {
        descriptionKey: "questRoom.description",
        options: [
          { value: 1, labelKey: "questRoom.choice.returnToDangerRoom" },
          { value: 2, labelKey: "questRoom.choice.inspectLock" },
        ],
      };

    case "otherShip":
      return {
        descriptionKey: "otherShip.description",
        options: [
          { value: 1, labelKey: "otherShip.choice.returnToQuestRoom" },
          ...(state.hasModule
            ? []
            : [
                {
                  value: 2,
                  labelKey: "otherShip.choice.inspectModule",
                } as const,
              ]),
        ],
      };
  }
}
