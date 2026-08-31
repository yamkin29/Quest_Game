import { Button, Group, TextInput } from "@mantine/core";
import { IconTerminal2 } from "@tabler/icons-react";
import type { FormEvent } from "react";
import { useEffect, useRef, useState } from "react";

import type { InputMode } from "@/entities/game";
import type { InterfaceMessageKey, Translator } from "@/shared/i18n";
import classes from "./GameConsole.module.css";

const placeholderKeys = {
  continue: "console.placeholder.continue",
  choice: "console.placeholder.choice",
  answer: "console.placeholder.answer",
  finished: "console.placeholder.finished",
} satisfies Record<InputMode, InterfaceMessageKey>;

const submitLabelKeys = {
  continue: "console.action.continue",
  choice: "console.action.submit",
  answer: "console.action.answer",
} satisfies Record<Exclude<InputMode, "finished">, InterfaceMessageKey>;

interface CommandFormProps {
  readonly inputMode: InputMode;
  readonly messageCount: number;
  readonly onRestart: () => void;
  readonly onSubmit: (command: string) => void;
  readonly t: Translator;
}

export function CommandForm({
  inputMode,
  messageCount,
  onRestart,
  onSubmit,
  t,
}: CommandFormProps) {
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const restartButtonRef = useRef<HTMLButtonElement>(null);
  const isFinished = inputMode === "finished";

  // biome-ignore lint/correctness/useExhaustiveDependencies: messageCount intentionally restores focus after each game update.
  useEffect(() => {
    if (isFinished) {
      restartButtonRef.current?.focus();
    } else {
      inputRef.current?.focus();
    }
  }, [isFinished, messageCount]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isFinished) {
      return;
    }

    onSubmit(inputMode === "continue" ? "" : command);
    setCommand("");
  };

  const handleRestart = () => {
    setCommand("");
    onRestart();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Group
        align="center"
        className={classes.commandRow}
        gap="var(--spacing-8)"
        wrap="wrap"
      >
        <TextInput
          aria-label={t("console.inputLabel")}
          className={classes.input}
          disabled={isFinished}
          leftSection={<IconTerminal2 aria-hidden="true" />}
          leftSectionPointerEvents="none"
          onChange={(event) => setCommand(event.currentTarget.value)}
          placeholder={t(placeholderKeys[inputMode])}
          ref={inputRef}
          value={command}
        />

        {isFinished ? (
          <Button
            className={classes.actionButton}
            onClick={handleRestart}
            ref={restartButtonRef}
            type="button"
          >
            {t("console.action.restart")}
          </Button>
        ) : (
          <Button className={classes.actionButton} type="submit">
            {t(submitLabelKeys[inputMode])}
          </Button>
        )}
      </Group>
    </form>
  );
}
