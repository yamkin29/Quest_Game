import { describe, expect, it } from "vitest";

import { deserializeLocale, getDefaultLocale, isLocale } from "./useLanguage";

describe("language model", () => {
  it("selects a supported browser locale and falls back to Russian", () => {
    expect(getDefaultLocale("en-US")).toBe("en");
    expect(getDefaultLocale("ru-RU")).toBe("ru");
    expect(getDefaultLocale("de-DE")).toBe("ru");
    expect(getDefaultLocale()).toBe("ru");
  });

  it("validates locale values restored from storage", () => {
    const browserFallback = getDefaultLocale(
      typeof navigator === "undefined" ? undefined : navigator.language,
    );

    expect(isLocale("ru")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
    expect(deserializeLocale(JSON.stringify("en"))).toBe("en");
    expect(deserializeLocale(JSON.stringify("de"))).toBe(browserFallback);
    expect(deserializeLocale("invalid-json")).toBe(browserFallback);
  });
});
