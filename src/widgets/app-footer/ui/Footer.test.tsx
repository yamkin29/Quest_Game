// @vitest-environment jsdom
import { AppShell } from "@mantine/core";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import { type Translator, translate } from "@/shared/i18n";

import { Footer } from "./Footer";

const t: Translator = (key, params) => translate("en", key, params);

describe("Footer", () => {
  it("shows the description and the current-year copyright", () => {
    renderWithProviders(
      <AppShell footer={{ height: 60 }}>
        <AppShell.Main />
        <Footer t={t} />
      </AppShell>,
    );

    expect(screen.getByText(t("footer.description"))).toBeInTheDocument();
    expect(
      screen.getByText(
        t("footer.copyright", { year: new Date().getFullYear() }),
      ),
    ).toBeInTheDocument();
  });
});
