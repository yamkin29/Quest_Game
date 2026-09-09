import { describe, expect, it } from "vitest";

import { en } from "./en";
import { ru } from "./ru";
import type { MessageKey, TranslationDictionary } from "./types";

const ruDictionary: TranslationDictionary = ru;
const enDictionary: TranslationDictionary = en;

const placeholderPattern = /\{\{([a-zA-Z][a-zA-Z0-9]*)\}\}/g;

function extractPlaceholders(value: string): string[] {
  return [...value.matchAll(placeholderPattern)]
    .map((match) => match[1])
    .filter((name): name is string => name !== undefined)
    .sort();
}

describe("translation dictionaries", () => {
  it("keeps the ru and en keys in sync", () => {
    expect(Object.keys(ruDictionary).sort()).toEqual(
      Object.keys(enDictionary).sort(),
    );
  });

  it("keeps every translation filled in both locales", () => {
    for (const dictionary of [ruDictionary, enDictionary]) {
      expect(Object.keys(dictionary).length).toBeGreaterThan(0);

      for (const value of Object.values(dictionary)) {
        expect(value.trim()).not.toBe("");
      }
    }
  });

  it("uses the same placeholders in both locales", () => {
    const keys = Object.keys(ruDictionary) as MessageKey[];

    for (const key of keys) {
      expect(extractPlaceholders(ruDictionary[key])).toEqual(
        extractPlaceholders(enDictionary[key]),
      );
    }
  });
});
