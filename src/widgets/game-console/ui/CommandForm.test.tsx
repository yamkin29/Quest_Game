// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/app/tests/test-utils";

import { type Translator, translate } from "@/shared/i18n";

import { CommandForm } from "./CommandForm";

const t: Translator = (key, params) => translate("en", key, params);

type CommandFormProps = Parameters<typeof CommandForm>[0];

function renderForm(overrides: Partial<CommandFormProps> = {}) {
  const props: CommandFormProps = {
    inputMode: "answer",
    messageCount: 3,
    onRestart: vi.fn(),
    onSubmit: vi.fn(),
    t,
    ...overrides,
  };

  const view = renderWithProviders(<CommandForm {...props} />);

  return { props, ...view };
}

describe("CommandForm", () => {
  it("submits the typed answer and clears the input", async () => {
    const user = userEvent.setup();
    const { props } = renderForm();

    const input = screen.getByLabelText(t("console.inputLabel"));
    await user.type(input, "reflection");
    await user.click(
      screen.getByRole("button", { name: t("console.action.answer") }),
    );

    expect(props.onSubmit).toHaveBeenCalledWith("reflection");
    expect(input).toHaveValue("");
  });

  it("submits the chosen option number in choice mode", async () => {
    const user = userEvent.setup();
    const { props } = renderForm({ inputMode: "choice" });

    await user.type(screen.getByLabelText(t("console.inputLabel")), "3");
    await user.click(
      screen.getByRole("button", { name: t("console.action.submit") }),
    );

    expect(props.onSubmit).toHaveBeenCalledWith("3");
  });

  it("submits an empty command in continue mode", async () => {
    const user = userEvent.setup();
    const { props } = renderForm({ inputMode: "continue" });

    await user.click(
      screen.getByRole("button", { name: t("console.action.continue") }),
    );

    expect(props.onSubmit).toHaveBeenCalledWith("");
  });

  it("locks the input and focuses restart once the game is finished", () => {
    renderForm({ inputMode: "finished" });

    expect(screen.getByLabelText(t("console.inputLabel"))).toBeDisabled();
    expect(
      screen.getByRole("button", { name: t("console.action.restart") }),
    ).toHaveFocus();
  });

  it("restarts from the finished screen", async () => {
    const user = userEvent.setup();
    const { props } = renderForm({ inputMode: "finished" });

    await user.click(
      screen.getByRole("button", { name: t("console.action.restart") }),
    );

    expect(props.onRestart).toHaveBeenCalledOnce();
  });

  it.each([
    ["continue", "console.placeholder.continue"],
    ["choice", "console.placeholder.choice"],
    ["answer", "console.placeholder.answer"],
    ["finished", "console.placeholder.finished"],
  ] as const)("shows the %s placeholder", (inputMode, placeholderKey) => {
    renderForm({ inputMode });

    expect(screen.getByLabelText(t("console.inputLabel"))).toHaveAttribute(
      "placeholder",
      t(placeholderKey),
    );
  });

  it("restores focus to the input after every new message", () => {
    const { rerender } = renderForm({ inputMode: "choice", messageCount: 2 });

    const input = screen.getByLabelText(t("console.inputLabel"));
    input.blur();
    expect(input).not.toHaveFocus();

    rerender(
      <CommandForm
        inputMode="choice"
        messageCount={3}
        onRestart={vi.fn()}
        onSubmit={vi.fn()}
        t={t}
      />,
    );

    expect(input).toHaveFocus();
  });
});
