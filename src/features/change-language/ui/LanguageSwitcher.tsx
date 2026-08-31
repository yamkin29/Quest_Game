import { SegmentedControl } from "@mantine/core";

import type { InterfaceMessageKey, Locale, Translator } from "@/shared/i18n";
import classes from "./LanguageSwitcher.module.css";

const segmentedControlClassNames = {
  control: classes.control,
  indicator: classes.indicator,
  innerLabel: classes.innerLabel,
  label: classes.label,
  root: classes.root,
} as const;

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
      classNames={segmentedControlClassNames}
      data={localeOptions.map(({ labelKey, value }) => ({
        label: t(labelKey),
        value,
      }))}
      name="quest-game-locale"
      onChange={onChange}
      size="xs"
      withItemsBorders={false}
      value={locale}
    />
  );
}
