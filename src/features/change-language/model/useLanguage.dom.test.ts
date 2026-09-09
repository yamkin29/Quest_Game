// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

import { translate } from "@/shared/i18n";

import { LOCALE_STORAGE_KEY, useLanguage } from "./useLanguage";

describe("useLanguage", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
  });

  it("defaults to the browser locale", () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.locale).toBe("en");
  });

  it("persists the chosen locale and syncs <html lang>", () => {
    const { result } = renderHook(() => useLanguage());

    act(() => {
      result.current.setLocale("ru");
    });

    expect(result.current.locale).toBe("ru");
    expect(document.documentElement.lang).toBe("ru");
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe(JSON.stringify("ru"));
  });

  it("falls back to the browser locale for unknown stored locales", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, JSON.stringify("de"));

    const { result } = renderHook(() => useLanguage());

    expect(result.current.locale).toBe("en");
  });

  it("falls back to the browser locale for malformed storage payloads", () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, "{not-json");

    const { result } = renderHook(() => useLanguage());

    expect(result.current.locale).toBe("en");
  });

  it("resets to the default locale and clears storage", () => {
    const { result } = renderHook(() => useLanguage());

    act(() => {
      result.current.setLocale("ru");
    });
    act(() => {
      result.current.resetLocale();
    });

    expect(result.current.locale).toBe("en");
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBeNull();
  });

  it("binds the translator to the active locale", () => {
    const { result } = renderHook(() => useLanguage());

    expect(result.current.t("header.status.playing")).toBe(
      translate("en", "header.status.playing"),
    );

    act(() => {
      result.current.setLocale("ru");
    });

    expect(result.current.t("header.status.playing")).toBe(
      translate("ru", "header.status.playing"),
    );
  });
});
