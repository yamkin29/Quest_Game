# Quest Game Web — Design System

## Source of truth

The original design tokens are preserved in [`docs/design-tokens.css`](./design-tokens.css). During React implementation, this file will move to `src/theme/tokens.css` and will be imported once from `src/main.tsx`.

Hardcoded colors, spacing, radii, shadows, font sizes, line heights, and layout widths must not appear in components when an existing token covers the value.

## Mantine integration strategy

The project will use two connected layers:

1. Mantine `createTheme` maps the token scale to Mantine component props.
2. Mantine `cssVariablesResolver` exposes semantic application variables for CSS Modules and light/dark themes.

Target theme files:

```text
src/theme/
├── tokens.css
├── theme.ts
├── cssVariablesResolver.ts
└── colorSchemeManager.ts
```

## Mantine theme mapping

| Mantine theme field | Design token mapping |
| --- | --- |
| `white` | `--color-pure-white` |
| `black` | `--color-ink-black` |
| `fontFamily` | `--font-roobert` |
| `headings.fontFamily` | `--font-roobert` |
| `colors.signal` | `colorsTuple(--color-cyan-signal)` |
| `primaryColor` | `signal` |
| `autoContrast` | `true` |
| `spacing.xs` | `--spacing-4` |
| `spacing.sm` | `--spacing-8` |
| `spacing.md` | `--spacing-16` |
| `spacing.lg` | `--spacing-24` |
| `spacing.xl` | `--spacing-32` |
| `radius.xs` | `--radius-md` |
| `radius.sm` | `--radius-inputs` |
| `radius.md` | `--radius-cards` |
| `radius.lg` | `--radius-2xl` |
| `radius.xl` | `--radius-full` |
| `defaultRadius` | `md` |
| `shadows.xs` | `--shadow-subtle` |
| `shadows.sm` | `--shadow-sm` |
| `shadows.md` | `--shadow-md` |
| `shadows.xl` | `--shadow-xl` |

Mantine requires at least ten shades for a custom theme color. The provided palette defines one primary signal color plus separate soft and edge colors, so the implementation will use `colorsTuple("#3ba6f1")` for `theme.colors.signal`. `--color-sky-wash` remains the soft accent and `--color-cyan-edge` remains the hover/edge accent through semantic variables and component Styles API.

## Typography mapping

| Role | Family | Size | Line height | Weight | Tracking |
| --- | --- | --- | --- | --- | --- |
| Caption | Inter | `--text-caption` | `--leading-caption` | Regular | Normal |
| Body | Inter | `--text-body-lg` | `--leading-body-lg` | Regular | `--tracking-body-lg` |
| Subheading | Roobert | `--text-subheading` | `--leading-subheading` | Medium | `--tracking-subheading` |
| Heading | Roobert | `--text-heading-sm` | `--leading-heading-sm` | Semibold | `--tracking-heading-sm` |
| Display | Roobert | `--text-display` | `--leading-display` | Semibold | `--tracking-display` |

The tokens reference Roobert but the repository does not currently contain Roobert font files. Roobert must only be bundled after licensed `.woff2` files are provided. Until then, its token falls back to the system font stack. Inter can be added as a local dependency during the React setup phase; no render-blocking remote font request will be used.

No separate monospace font token was provided. The console will initially use the provided Inter stack instead of introducing an unapproved visual token.

## Semantic color layer

Components should use semantic variables instead of primitive color names. The light theme follows the supplied surface tokens. The dark theme is derived only from the supplied palette; it introduces no new hex values.

```css
:root,
[data-mantine-color-scheme="light"] {
  --app-surface-canvas: var(--surface-canvas);
  --app-surface-card: var(--surface-card);
  --app-surface-floating: var(--surface-floating-preview);
  --app-surface-inverted: var(--surface-inverted-section);
  --app-text-primary: var(--color-ink-black);
  --app-text-secondary: var(--color-warm-gray);
  --app-text-muted: var(--color-warm-gray);
  --app-border-default: var(--color-stone-border);
  --app-border-strong: var(--color-warm-gray);
  --app-accent: var(--color-cyan-signal);
  --app-accent-soft: var(--color-sky-wash);
  --app-accent-hover: var(--color-cyan-edge);
  --app-accent-focus: var(--color-cyan-edge);
}

[data-mantine-color-scheme="dark"] {
  --app-surface-canvas: var(--color-ink-black);
  --app-surface-card: var(--color-soot);
  --app-surface-floating: var(--color-soot);
  --app-surface-inverted: var(--color-stone-canvas);
  --app-text-primary: var(--color-stone-canvas);
  --app-text-secondary: var(--color-stone-muted);
  --app-text-muted: var(--color-ash-gray);
  --app-border-default: var(--color-warm-gray);
  --app-border-strong: var(--color-ash-gray);
  --app-accent: var(--color-cyan-signal);
  --app-accent-soft: var(--color-sky-wash);
  --app-accent-hover: var(--color-cyan-edge);
  --app-accent-focus: var(--color-cyan-signal);
}
```

These aliases will be emitted from Mantine `cssVariablesResolver`, keeping the color scheme synchronized with `MantineProvider`.

The light theme deliberately uses `warm-gray` for muted text and strong input borders: it reaches a 4.80:1 contrast ratio on white, while `ash-gray` and `stone-muted` remain available for non-text decoration. `cyan-edge` is used for the light-theme focus ring because it reaches 3.13:1 against white. No colors outside the supplied palette are introduced.

## Component token mapping

| Component | Mantine base | Token rules |
| --- | --- | --- |
| Application shell | `AppShell` | Canvas uses `--app-surface-canvas`; max content width is `--page-max-width` |
| Header/Footer | `AppShell.Header/Footer` | Border uses `--app-border-default`; horizontal spacing uses the spacing scale |
| Console window | `Paper` | `--radius-cards`, `--shadow-xl`, `--app-surface-card` |
| Console output | `ScrollArea` | Body typography; scrollbar colors use semantic border/accent variables |
| Text input | `TextInput` | `--radius-inputs`, body typography, semantic border/focus colors |
| Primary action | `Button` | `--radius-buttons`, cyan signal background, cyan edge hover |
| Icon action | `ActionIcon` | `--radius-icons`, semantic focus and hover colors |
| Language control | `SegmentedControl` | `--radius-buttons`, signal indicator, auto contrast |
| Status/tag | `Badge` | `--radius-tags`, caption typography |
| Feature card | `Paper` | `--radius-feature-card`, `--card-padding`, `--shadow-md` |

## Layout rules

- Page content must not exceed `--page-max-width`.
- Major sections use `--section-gap` where the page layout needs vertical separation.
- Cards use `--card-padding`.
- Tightly related elements use `--element-gap`.
- Responsive reductions must select another existing spacing token instead of inventing intermediate pixel values.
- Mobile layouts may use Mantine responsive props, but the values must still reference the token scale.

## Theme rules

- `MantineProvider` is the only color-scheme provider.
- The first visit uses `defaultColorScheme="auto"`.
- The selected scheme is stored under `quest-game.color-scheme.v1`.
- Components must not read `window.matchMedia` directly; they use Mantine color-scheme hooks.
- CSS Modules use semantic `--app-*` variables or Mantine variables, never theme-specific raw hex values.
- Theme switching must not reset language or game state.

## Accessibility checks

- Enable Mantine `autoContrast` for signal-colored filled controls.
- Keep Mantine's keyboard-only focus ring behavior (`focusRing: "auto"`).
- Verify cyan signal text/background combinations before release.
- Do not communicate game status using color alone.
- Both themes must be checked against WCAG AA contrast for body text and interactive controls.

## Open asset dependency

The only unresolved design asset is the Roobert font. Implementation can proceed with its defined fallback stack. Adding actual Roobert files requires the licensed `.woff2` assets from the project owner.
