import type { MantineTheme } from "@mantine/core";
import { describe, expect, it } from "vitest";

import { cssVariablesResolver } from "./cssVariablesResolver";

const sharedVariables = [
  "--app-page-max-width",
  "--app-card-padding",
  "--app-element-gap",
];

const surfaceVariables = [
  "--app-surface-canvas",
  "--app-surface-card",
  "--app-surface-floating",
  "--app-surface-inverted",
  "--app-text-primary",
  "--app-text-secondary",
  "--app-text-muted",
  "--app-border-default",
  "--app-border-strong",
  "--app-accent",
  "--app-accent-soft",
  "--app-accent-hover",
  "--app-accent-focus",
  "--app-status-playing",
  "--app-status-won",
  "--app-status-dead",
  "--app-grid-line",
  "--app-terminal-glow",
];

// The resolver only reads the scheme, so an empty theme stub is enough.
const resolve = () => cssVariablesResolver({} as unknown as MantineTheme);

describe("cssVariablesResolver", () => {
  it("maps the shared layout tokens", () => {
    expect(Object.keys(resolve().variables)).toEqual(sharedVariables);
  });

  it("resolves the light palette", () => {
    const { light } = resolve();

    expect(Object.keys(light)).toEqual(surfaceVariables);
    for (const value of Object.values(light)) {
      expect(value).not.toBe("");
    }
  });

  it("resolves the dark palette", () => {
    const { dark } = resolve();

    expect(Object.keys(dark)).toEqual(surfaceVariables);
    for (const value of Object.values(dark)) {
      expect(value).not.toBe("");
    }
  });

  it("keeps light and dark palettes symmetric", () => {
    const { light, dark } = resolve();

    expect(Object.keys(dark)).toEqual(Object.keys(light));
  });
});
