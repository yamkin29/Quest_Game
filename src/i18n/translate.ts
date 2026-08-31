import { en } from "./en";
import { ru } from "./ru";
import type {
  Locale,
  MessageKey,
  TranslationDictionary,
  TranslationParams,
} from "./types";

const placeholderPattern = /\{\{([a-zA-Z][a-zA-Z0-9]*)\}\}/g;

const dictionaries = {
  ru,
  en,
} satisfies Record<Locale, TranslationDictionary>;

export function translate(
  locale: Locale,
  key: MessageKey,
  params: TranslationParams = {},
): string {
  const template = dictionaries[locale][key];

  return template.replace(placeholderPattern, (placeholder, name: string) => {
    const value = params[name];
    return value === undefined ? placeholder : String(value);
  });
}
