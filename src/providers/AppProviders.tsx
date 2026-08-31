import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";

import { colorSchemeManager } from "../theme/colorSchemeManager";
import { cssVariablesResolver } from "../theme/cssVariablesResolver";
import { theme } from "../theme/theme";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <MantineProvider
      colorSchemeManager={colorSchemeManager}
      cssVariablesResolver={cssVariablesResolver}
      defaultColorScheme="auto"
      theme={theme}
    >
      {children}
    </MantineProvider>
  );
}
