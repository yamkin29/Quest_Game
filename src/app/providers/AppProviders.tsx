import { MantineProvider } from "@mantine/core";
import type { PropsWithChildren } from "react";

import { colorSchemeManager } from "@/app/theme/colorSchemeManager";
import { cssVariablesResolver } from "@/app/theme/cssVariablesResolver";
import { theme } from "@/app/theme/theme";

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
