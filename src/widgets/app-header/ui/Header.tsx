import { AppShell, Container, Group, Text } from "@mantine/core";

import { LanguageSwitcher } from "@/features/change-language";
import { ThemeToggle } from "@/features/toggle-theme";
import type { Locale, Translator } from "@/shared/i18n";
import classes from "./Header.module.css";

interface HeaderProps {
  readonly locale: Locale;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly t: Translator;
}

export function Header({ locale, onLocaleChange, t }: HeaderProps) {
  return (
    <AppShell.Header className={classes.header}>
      <Container className={classes.container} size="var(--app-page-max-width)">
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group className={classes.brand} gap="var(--spacing-8)" wrap="nowrap">
            <img
              alt=""
              aria-hidden="true"
              className={classes.icon}
              height="32"
              src="/favicon.svg"
              width="32"
            />
            <Text className={classes.title} component="span">
              {t("app.title")}
            </Text>
          </Group>

          <Group
            className={classes.settings}
            data-settings-slot
            gap="var(--spacing-12)"
            wrap="nowrap"
          >
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} t={t} />
            <ThemeToggle t={t} />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
