// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import { type Translator, translate } from "@/shared/i18n";

import { LanguageSwitcher } from "./LanguageSwitcher";

const t: Translator = (key, params) => translate("en", key, params);

describe("LanguageSwitcher", () => {
  it("exposes both locales as a radio group", () => {
    renderWithProviders(
      <LanguageSwitcher locale="ru" onChange={vi.fn()} t={t} />,
    );

    const group = screen.getByRole("radiogroup", { name: t("locale.label") });

    expect(group).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Русский" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "English" })).not.toBeChecked();
  });

  it("reports the chosen locale upward", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(
      <LanguageSwitcher locale="ru" onChange={onChange} t={t} />,
    );

    await user.click(screen.getByText("English"));

    expect(onChange).toHaveBeenCalledWith("en");
  });
});
