import { AppShell, Container } from "@mantine/core";

import { useGame } from "@/entities/game";
import { useLanguage } from "@/features/change-language";
import { Footer } from "@/widgets/app-footer";
import { Header } from "@/widgets/app-header";
import { ConsoleWindow } from "@/widgets/game-console";
import classes from "./GamePage.module.css";

export function GamePage() {
  const { locale, setLocale, t } = useLanguage();
  const { state, submit, restart } = useGame();

  return (
    <AppShell
      className={classes.root}
      data-locale={locale}
      data-status={state.status}
      footer={{ height: "var(--spacing-64)" }}
      header={{ height: "var(--spacing-72)" }}
      padding={{ base: "var(--spacing-16)", sm: "var(--spacing-32)" }}
    >
      <Header locale={locale} onLocaleChange={setLocale} t={t} />

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
