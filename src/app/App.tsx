import { AppShell, Container } from "@mantine/core";

import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ConsoleWindow } from "../features/game/components/ConsoleWindow";
import type { GameStatus } from "../features/game/engine/types";
import { useGame } from "../features/game/hooks/useGame";
import { useLanguage } from "../hooks/useLanguage";
import type { InterfaceMessageKey } from "../i18n/types";
import classes from "./App.module.css";

const statusKeys = {
  playing: "header.status.playing",
  won: "header.status.won",
  dead: "header.status.dead",
} satisfies Record<GameStatus, InterfaceMessageKey>;

export function App() {
  const { locale, setLocale, t } = useLanguage();
  const { state, submit, restart } = useGame();

  return (
    <AppShell
      className={classes.root}
      data-locale={locale}
      footer={{ height: "var(--spacing-80)" }}
      header={{ height: "var(--spacing-80)" }}
      padding={{ base: "var(--spacing-16)", sm: "var(--spacing-32)" }}
    >
      <Header
        locale={locale}
        onLocaleChange={setLocale}
        statusLabel={t(statusKeys[state.status])}
        t={t}
      />

      <AppShell.Main className={classes.main}>
        <Container size="var(--app-page-max-width)" w="100%">
          <ConsoleWindow
            onRestart={restart}
            onSubmit={submit}
            state={state}
            t={t}
          />
        </Container>
      </AppShell.Main>

      <Footer t={t} />
    </AppShell>
  );
}
