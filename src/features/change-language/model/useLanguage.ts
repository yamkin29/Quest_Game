import { useLocalStorage } from "@mantine/hooks";
import { useEffect } from "react";

import {
  type Locale,
  type MessageKey,
  type TranslationParams,
  translate,
} from "@/shared/i18n";

export const LOCALE_STORAGE_KEY = "quest-game.locale.v1";

export function isLocale(value: unknown): value is Locale {
  return value === "ru" || value === "en";
}

export function getDefaultLocale(language?: string): Locale {
  if (language?.toLocaleLowerCase().startsWith("en")) {
    return "en";
  }

  return "ru";
}

export function deserializeLocale(value: string | undefined): Locale {
  if (value === undefined) {
    return getBrowserLocale();
  }

  try {
    const parsed: unknown = JSON.parse(value);
    return isLocale(parsed) ? parsed : getBrowserLocale();
  } catch {
    return getBrowserLocale();
  }
}

export function useLanguage() {
  const [locale, setLocale, resetLocale] = useLocalStorage<Locale>({
    key: LOCALE_STORAGE_KEY,
    defaultValue: getBrowserLocale(),
    deserialize: deserializeLocale,
    getInitialValueInEffect: false,
  });

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key: MessageKey, params?: TranslationParams) =>
    translate(locale, key, params);

  return { locale, setLocale, resetLocale, t } as const;
}

function getBrowserLocale(): Locale {
  return getDefaultLocale(
    typeof navigator === "undefined" ? undefined : navigator.language,
  );
}
