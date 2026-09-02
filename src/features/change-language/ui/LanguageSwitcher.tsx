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

const localeOptions = [
  { label: "ru", value: "ru" },
  { label: "en", value: "en" },
] satisfies readonly {
  readonly label: Locale;
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
