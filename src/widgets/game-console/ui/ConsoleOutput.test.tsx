// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import type { GameMessage } from "@/entities/game";
import { type Translator, translate } from "@/shared/i18n";

import { ConsoleOutput } from "./ConsoleOutput";

const t: Translator = (key, params) => translate("en", key, params);

const messages: readonly GameMessage[] = [
  { id: "message-1", kind: "story", key: "intro.awakening" },
  {
    id: "message-2",
    kind: "input",
    key: "input.command",
    params: { value: "1" },
  },
  {
    id: "message-3",
    kind: "error",
    key: "error.invalidChoice",
    params: { options: "1" },
  },
];

describe("ConsoleOutput", () => {
  it("renders one paragraph per message through the translator", () => {
    renderWithProviders(<ConsoleOutput messages={messages} t={t} />);

    expect(screen.getAllByRole("paragraph")).toHaveLength(3);
    expect(
      screen.getByText(translate("en", "intro.awakening")),
    ).toBeInTheDocument();
    expect(screen.getByText("> 1")).toBeInTheDocument();
    expect(
      screen.getByText(
        translate("en", "error.invalidChoice", { options: "1" }),
      ),
    ).toBeInTheDocument();
  });

  it("marks every message with its kind", () => {
    renderWithProviders(<ConsoleOutput messages={messages} t={t} />);

    expect(screen.getByText("> 1")).toHaveAttribute("data-kind", "input");
    expect(
      screen.getByText(translate("en", "intro.awakening")),
    ).toHaveAttribute("data-kind", "story");
  });

  it("exposes the history as a polite live log", () => {
    renderWithProviders(<ConsoleOutput messages={[]} t={t} />);

    const log = screen.getByRole("log");

    expect(log).toHaveAttribute("aria-label", t("console.historyLabel"));
    expect(log).toHaveAttribute("aria-live", "polite");
    expect(log).toHaveAttribute("aria-atomic", "false");
    expect(screen.queryAllByRole("paragraph")).toHaveLength(0);
  });
});
