import type { CSSVariablesResolver } from "@mantine/core";

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    "--app-page-max-width": "var(--page-max-width)",
    "--app-card-padding": "var(--card-padding)",
    "--app-element-gap": "var(--element-gap)",
  },
  light: {
    "--app-surface-canvas": "var(--surface-canvas)",
    "--app-surface-card": "var(--surface-card)",
    "--app-surface-floating": "var(--surface-floating-preview)",
    "--app-surface-inverted": "var(--surface-inverted-section)",
    "--app-text-primary": "var(--color-ink-black)",
    "--app-text-secondary": "var(--color-warm-gray)",
    "--app-text-muted": "var(--color-warm-gray)",
    "--app-border-default": "var(--color-stone-border)",
    "--app-border-strong": "var(--color-warm-gray)",
    "--app-accent": "var(--color-cyan-signal)",
    "--app-accent-soft": "var(--color-sky-wash)",
    "--app-accent-hover": "var(--color-cyan-edge)",
    "--app-accent-focus": "var(--color-cyan-edge)",
  },
  dark: {
    "--app-surface-canvas": "var(--color-ink-black)",
    "--app-surface-card": "var(--color-soot)",
    "--app-surface-floating": "var(--color-soot)",
    "--app-surface-inverted": "var(--color-stone-canvas)",
    "--app-text-primary": "var(--color-stone-canvas)",
    "--app-text-secondary": "var(--color-stone-muted)",
    "--app-text-muted": "var(--color-ash-gray)",
    "--app-border-default": "var(--color-warm-gray)",
    "--app-border-strong": "var(--color-ash-gray)",
    "--app-accent": "var(--color-cyan-signal)",
    "--app-accent-soft": "var(--color-sky-wash)",
    "--app-accent-hover": "var(--color-cyan-edge)",
    "--app-accent-focus": "var(--color-cyan-signal)",
  },
});
