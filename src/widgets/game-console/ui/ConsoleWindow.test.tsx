// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import { createInitialGameState, type GameState } from "@/entities/game";
import { type Translator, translate } from "@/shared/i18n";

import { ConsoleWindow } from "./ConsoleWindow";

const t: Translator = (key, params) => translate("en", key, params);

function renderWindow(state: GameState) {
  return renderWithProviders(
    <ConsoleWindow
      onRestart={vi.fn()}
      onSubmit={vi.fn()}
      state={state}
      t={t}
    />,
  );
}

describe("ConsoleWindow", () => {
  it("labels the terminal section with its title", () => {
    renderWindow(createInitialGameState());

    const title = screen.getByRole("heading", { name: t("console.title") });

    expect(title).toHaveAttribute("id", "game-console-title");
    expect(
      screen.getByRole("region", { name: t("console.title") }),
    ).toBeInTheDocument();
  });

  it("shows the intro history and the command form", () => {
    renderWindow(createInitialGameState());

    expect(screen.getByRole("log")).toBeInTheDocument();
    expect(
      screen.getByText(translate("en", "intro.awakening")),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(t("console.inputLabel"))).toBeInTheDocument();
  });

  it("marks the status badge with the game status", () => {
    renderWindow({
      ...createInitialGameState(),
      status: "won",
      inputMode: "finished",
    });

    const badge = screen
      .getByText(t("header.status.won"))
      .closest("[data-status]");

    expect(badge).toHaveAttribute("data-status", "won");
  });
});
