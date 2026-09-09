import { SegmentedControl } from "@mantine/core";

import type { Locale, Translator } from "@/shared/i18n";
import classes from "./LanguageSwitcher.module.css";

const segmentedControlClassNames = {
  control: classes.control,
  indicator: classes.indicator,
  innerLabel: classes.innerLabel,
  label: classes.label,
  root: classes.root,
} as const;

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
  // Option labels come from the dictionaries, which keep native names
  // ("Русский" / "English") in both locales.
  const localeOptions: {
    readonly label: string;
    readonly value: Locale;
  }[] = [
    { label: t("locale.ru"), value: "ru" },
    { label: t("locale.en"), value: "en" },
  ];

  return (
    <SegmentedControl<Locale>
      aria-label={t("locale.label")}
      classNames={segmentedControlClassNames}
      data={localeOptions}
      name="quest-game-locale"
      onChange={onChange}
      size="xs"
      withItemsBorders={false}
      value={locale}
    />
  );
}
