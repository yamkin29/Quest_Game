// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";
import { translate } from "@/shared/i18n";
import { en } from "@/shared/i18n/en";
import { ru } from "@/shared/i18n/ru";

import { GamePage } from "./GamePage";

const t = (key: keyof typeof en) => en[key];

async function continueStory(times = 1) {
  const user = userEvent.setup();

  for (let step = 0; step < times; step += 1) {
    await user.click(
      screen.getByRole("button", { name: en["console.action.continue"] }),
    );
  }
}

describe("GamePage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders the full page shell", () => {
    renderWithProviders(<GamePage />);

    expect(
      screen.getByRole("heading", { name: t("console.title") }),
    ).toBeInTheDocument();
    expect(screen.getByRole("log")).toBeInTheDocument();
    expect(screen.getByText(t("app.title"))).toBeInTheDocument();
    expect(screen.getByText(t("footer.description"))).toBeInTheDocument();
  });

  it("carries locale and status on the shell element", () => {
    renderWithProviders(<GamePage />);

    const shell = screen.getByRole("log").closest("[data-locale]");

    expect(shell).not.toBeNull();
    expect(shell).toHaveAttribute("data-locale", "en");
    expect(shell).toHaveAttribute("data-status", "playing");
  });

  it("advances the intro story on continue", async () => {
    renderWithProviders(<GamePage />);
    await continueStory();

    expect(
      screen.getByText(translate("en", "intro.belt").replace(/\s+/g, " ")),
    ).toBeInTheDocument();
  });

  it("reports an invalid choice without breaking the game", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GamePage />);

    await continueStory(6);

    await user.type(screen.getByLabelText(t("console.inputLabel")), "9");
    await user.click(
      screen.getByRole("button", { name: en["console.action.submit"] }),
    );

    expect(
      screen.getByText(
        translate("en", "error.invalidChoice", { options: "1" }),
      ),
    ).toBeInTheDocument();
  });

  it("switches the language in place", async () => {
    const user = userEvent.setup();
    renderWithProviders(<GamePage />);

    await user.click(screen.getByText("Русский"));

    expect(
      screen.getByRole("heading", { name: ru["console.title"] }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(ru["console.inputLabel"])).toBeInTheDocument();

    const shell = screen.getByRole("log").closest("[data-locale]");

    expect(shell).toHaveAttribute("data-locale", "ru");
  });

  it("keeps the chosen language across remounts", async () => {
    const user = userEvent.setup();
    const firstMount = renderWithProviders(<GamePage />);

    await user.click(screen.getByText("Русский"));
    firstMount.unmount();

    renderWithProviders(<GamePage />);

    expect(screen.getByLabelText(ru["console.inputLabel"])).toBeInTheDocument();
  });
});
