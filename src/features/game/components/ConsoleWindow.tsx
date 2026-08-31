import { Badge, Divider, Group, Paper, Text } from "@mantine/core";

import type { InterfaceMessageKey, Translator } from "../../../i18n/types";
import classes from "../../../styles/console.module.css";
import type { GameState, GameStatus } from "../engine/types";
import { CommandForm } from "./CommandForm";
import { ConsoleOutput } from "./ConsoleOutput";

const statusKeys = {
  playing: "header.status.playing",
  won: "header.status.won",
  dead: "header.status.dead",
} satisfies Record<GameStatus, InterfaceMessageKey>;

interface ConsoleWindowProps {
  readonly onRestart: () => void;
  readonly onSubmit: (command: string) => void;
  readonly state: GameState;
  readonly t: Translator;
}

export function ConsoleWindow({
  onRestart,
  onSubmit,
  state,
  t,
}: ConsoleWindowProps) {
  return (
    <Paper
      aria-labelledby="game-console-title"
      className={classes.window}
      component="section"
      shadow="xl"
      withBorder
    >
      <Group
        className={classes.windowHeader}
        justify="space-between"
        wrap="nowrap"
      >
        <Group gap="var(--spacing-12)" wrap="nowrap">
          <Group aria-hidden="true" gap="var(--spacing-4)" wrap="nowrap">
            <span className={classes.indicator} data-tone="muted" />
            <span className={classes.indicator} data-tone="soft" />
            <span className={classes.indicator} data-tone="signal" />
          </Group>
          <Text
            className={classes.windowTitle}
            component="h1"
            id="game-console-title"
          >
            {t("console.title")}
          </Text>
        </Group>

        <Badge color="signal" variant="light">
          {t(statusKeys[state.status])}
        </Badge>
      </Group>

      <Divider />
      <ConsoleOutput messages={state.messages} t={t} />
      <Divider />
      <CommandForm
        inputMode={state.inputMode}
        messageCount={state.messages.length}
        onRestart={onRestart}
        onSubmit={onSubmit}
        t={t}
      />
    </Paper>
  );
}
