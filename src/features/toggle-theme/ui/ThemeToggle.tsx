import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

import type { Translator } from "@/shared/i18n";
import classes from "./ThemeToggle.module.css";

const tooltipClassNames = { tooltip: classes.tooltip } as const;

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
      arrowSize={4}
      classNames={tooltipClassNames}
      events={{ focus: true, hover: true, touch: false }}
      label={label}
      multiline
      openDelay={300}
      position="bottom"
      transitionProps={{ duration: 120 }}
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
