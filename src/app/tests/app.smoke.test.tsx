// @vitest-environment jsdom
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { en } from "@/shared/i18n/en";

import { App } from "../App";
import { renderWithProviders } from "./test-utils";

describe("App", () => {
  it("mounts the game page without crashing", () => {
    renderWithProviders(<App />);

    expect(screen.getByRole("log")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: en["console.title"] }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(en["console.inputLabel"])).toBeInTheDocument();
  });
});
