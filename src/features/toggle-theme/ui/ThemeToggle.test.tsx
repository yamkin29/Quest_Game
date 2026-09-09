// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";
import { type Translator, translate } from "@/shared/i18n";

import { ThemeToggle } from "./ThemeToggle";

const t: Translator = (key, params) => translate("en", key, params);

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("offers to switch to the dark theme first", () => {
    renderWithProviders(<ThemeToggle t={t} />);

    expect(
      screen.getByRole("button", { name: t("theme.switchToDark") }),
    ).toBeInTheDocument();
  });

  it("switches the color scheme and flips the action", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ThemeToggle t={t} />);

    await user.click(
      screen.getByRole("button", { name: t("theme.switchToDark") }),
    );

    expect(document.documentElement).toHaveAttribute(
      "data-mantine-color-scheme",
      "dark",
    );
    expect(
      screen.getByRole("button", { name: t("theme.switchToLight") }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: t("theme.switchToLight") }),
    );

    expect(document.documentElement).toHaveAttribute(
      "data-mantine-color-scheme",
      "light",
    );
  });
});
