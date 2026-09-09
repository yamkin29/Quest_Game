// @vitest-environment jsdom
import { AppShell } from "@mantine/core";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import { type Translator, translate } from "@/shared/i18n";

import { Header } from "./Header";

const t: Translator = (key, params) => translate("en", key, params);

function renderHeader() {
  const onLocaleChange = vi.fn();

  renderWithProviders(
    <AppShell header={{ height: 60 }}>
      <Header locale="ru" onLocaleChange={onLocaleChange} t={t} />
      <AppShell.Main />
    </AppShell>,
  );

  return onLocaleChange;
}

describe("Header", () => {
  it("shows the branding", () => {
    renderHeader();

    expect(screen.getByText(t("app.title"))).toBeInTheDocument();
  });

  it("keeps both controls in the settings slot", () => {
    renderHeader();

    const slot = document.querySelector<HTMLElement>("[data-settings-slot]");

    expect(slot).not.toBeNull();
    expect(slot).toHaveTextContent("ru");
    expect(slot).toHaveTextContent("en");
    expect(
      slot?.querySelector(`[aria-label="${t("theme.switchToDark")}"]`),
    ).not.toBeNull();
  });

  it("delegates locale changes upward", async () => {
    const user = userEvent.setup();
    const onLocaleChange = renderHeader();

    await user.click(screen.getByText("en"));

    expect(onLocaleChange).toHaveBeenCalledWith("en");
  });
});
