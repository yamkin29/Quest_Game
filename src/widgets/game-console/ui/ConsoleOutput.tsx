import { ScrollArea, Stack, Text } from "@mantine/core";
import { useEffect, useRef } from "react";

import type { GameMessage } from "@/entities/game";
import type { Translator } from "@/shared/i18n";
import classes from "./GameConsole.module.css";

const scrollAreaClassNames = { viewport: classes.viewport } as const;

interface ConsoleOutputProps {
  readonly messages: readonly GameMessage[];
  readonly t: Translator;
}

export function ConsoleOutput({ messages, t }: ConsoleOutputProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: messages.length intentionally triggers scrolling after new output.
  useEffect(() => {
    const viewport = viewportRef.current;

    if (viewport) {
      viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
    }
  }, [messages.length]);

  return (
    <ScrollArea
      className={classes.output}
      classNames={scrollAreaClassNames}
      offsetScrollbars="present"
      scrollbars="y"
      type="auto"
      viewportProps={{
        "aria-atomic": false,
        "aria-label": t("console.historyLabel"),
        "aria-live": "polite",
        "aria-relevant": "additions text",
        role: "log",
      }}
      viewportRef={viewportRef}
    >
      <Stack gap="var(--spacing-12)" p="var(--spacing-16)">
        {messages.map((message) => (
          <Text
            className={classes.message}
            component="p"
            data-kind={message.kind}
            key={message.id}
          >
            {t(message.key, message.params)}
          </Text>
        ))}
      </Stack>
    </ScrollArea>
  );
}
