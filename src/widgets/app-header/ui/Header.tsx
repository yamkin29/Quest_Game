import {
  AppShell,
  Badge,
  Container,
  Group,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconRocket } from "@tabler/icons-react";

import { LanguageSwitcher } from "@/features/change-language";
import { ThemeToggle } from "@/features/toggle-theme";
import type { Locale, Translator } from "@/shared/i18n";
import classes from "./Header.module.css";

interface HeaderProps {
  readonly locale: Locale;
  readonly onLocaleChange: (locale: Locale) => void;
  readonly statusLabel: string;
  readonly t: Translator;
}

export function Header({
  locale,
  onLocaleChange,
  statusLabel,
  t,
}: HeaderProps) {
  return (
    <AppShell.Header className={classes.header}>
      <Container className={classes.container} size="var(--app-page-max-width)">
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group className={classes.brand} gap="var(--spacing-8)" wrap="nowrap">
            <ThemeIcon
              className={classes.icon}
              color="signal"
              radius="xs"
              size="var(--spacing-32)"
              variant="light"
            >
              <IconRocket aria-hidden="true" />
            </ThemeIcon>
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
            <Badge color="signal" variant="light" visibleFrom="sm">
              {statusLabel}
            </Badge>
            <LanguageSwitcher locale={locale} onChange={onLocaleChange} t={t} />
            <ThemeToggle t={t} />
          </Group>
        </Group>
      </Container>
    </AppShell.Header>
  );
}
