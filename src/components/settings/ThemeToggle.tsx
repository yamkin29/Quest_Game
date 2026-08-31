import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

import type { Translator } from "../../i18n/types";
import classes from "./ThemeToggle.module.css";

interface ThemeToggleProps {
  readonly t: Translator;
}

export function ThemeToggle({ t }: ThemeToggleProps) {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: false,
  });
  const { setColorScheme } = useMantineColorScheme();
  const isDark = computedColorScheme === "dark";
  const label = t(isDark ? "theme.switchToLight" : "theme.switchToDark");

  const handleToggle = () => {
    setColorScheme(isDark ? "light" : "dark");
  };

  return (
    <Tooltip
      events={{ focus: true, hover: true, touch: false }}
      label={label}
      position="bottom"
      withArrow
    >
      <ActionIcon
        aria-label={label}
        className={classes.root}
        onClick={handleToggle}
        size="input-xs"
        variant="default"
      >
        {isDark ? (
          <IconSun aria-hidden="true" />
        ) : (
          <IconMoonStars aria-hidden="true" />
        )}
      </ActionIcon>
    </Tooltip>
  );
}
