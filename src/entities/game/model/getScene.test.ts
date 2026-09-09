import { describe, expect, it } from "vitest";

import { getScene } from "./getScene";
import type { Room } from "./types";

const rooms: readonly Room[] = [
  "starship",
  "temple",
  "livingRoom",
  "dangerRoom",
  "questRoom",
  "otherShip",
];

describe("getScene", () => {
  it.each(rooms)("defines a scene with options for %s", (room) => {
    const scene = getScene({ room, hasKey: false, hasModule: false });

    expect(scene.descriptionKey).toBeTruthy();
    expect(scene.options.length).toBeGreaterThan(0);
  });

  it("assigns unique values to the options of every scene", () => {
    for (const room of rooms) {
      const values = getScene({
        room,
        hasKey: true,
        hasModule: true,
      }).options.map((option) => option.value);

      expect(new Set(values).size).toBe(values.length);
    }
  });

  it("gates the ship escape behind the power module", () => {
    const withoutModule = getScene({
      room: "starship",
      hasKey: false,
      hasModule: false,
    });
    const withModule = getScene({
      room: "starship",
      hasKey: false,
      hasModule: true,
    });

    expect(withoutModule.options.map((option) => option.labelKey)).toEqual([
      "starship.choice.leave",
    ]);
    expect(withModule.options).toHaveLength(2);
    expect(withModule.options.at(-1)?.labelKey).toBe("starship.choice.escape");
  });

  it("removes the search option once the key is found", () => {
    const withKey = getScene({
      room: "livingRoom",
      hasKey: true,
      hasModule: false,
    });

    expect(
      getScene({ room: "livingRoom", hasKey: false, hasModule: false }).options,
    ).toHaveLength(2);
    expect(withKey.options.map((option) => option.labelKey)).toEqual([
      "livingRoom.choice.returnToTemple",
    ]);
  });

  it("removes the module inspection once the module is taken", () => {
    const withModule = getScene({
      room: "otherShip",
      hasKey: false,
      hasModule: true,
    });

    expect(
      getScene({ room: "otherShip", hasKey: false, hasModule: false }).options,
    ).toHaveLength(2);
    expect(withModule.options.map((option) => option.labelKey)).toEqual([
      "otherShip.choice.returnToQuestRoom",
    ]);
  });
});
