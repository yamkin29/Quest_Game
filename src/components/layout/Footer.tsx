import { AppShell, Container, Group, Text } from "@mantine/core";

import type { Translator } from "../../i18n/types";
import classes from "./Footer.module.css";

const currentYear = new Date().getFullYear();

interface FooterProps {
  readonly t: Translator;
}

export function Footer({ t }: FooterProps) {
  return (
    <AppShell.Footer className={classes.footer}>
      <Container className={classes.container} size="var(--app-page-max-width)">
        <Group
          align="center"
          gap="var(--spacing-4) var(--spacing-16)"
          h="100%"
          justify="space-between"
        >
          <Text className={classes.text} component="p">
            {t("footer.description")}
          </Text>
          <Text className={classes.text} component="p">
            {t("footer.copyright", { year: currentYear })}
          </Text>
        </Group>
      </Container>
    </AppShell.Footer>
  );
}
