import { SegmentedControl } from "@mantine/core";

import type { InterfaceMessageKey, Locale, Translator } from "@/shared/i18n";

const localeOptions = [
  { labelKey: "locale.ru", value: "ru" },
  { labelKey: "locale.en", value: "en" },
] satisfies readonly {
  readonly labelKey: InterfaceMessageKey;
  readonly value: Locale;
}[];

interface LanguageSwitcherProps {
  readonly locale: Locale;
  readonly onChange: (locale: Locale) => void;
  readonly t: Translator;
}

export function LanguageSwitcher({
  locale,
  onChange,
  t,
}: LanguageSwitcherProps) {
  return (
    <SegmentedControl<Locale>
      aria-label={t("locale.label")}
      data={localeOptions.map(({ labelKey, value }) => ({
        label: t(labelKey),
        value,
      }))}
      name="quest-game-locale"
      onChange={onChange}
      size="xs"
      value={locale}
    />
  );
}
