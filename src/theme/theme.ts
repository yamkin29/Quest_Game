import {
  ActionIcon,
  Button,
  colorsTuple,
  createTheme,
  Paper,
  SegmentedControl,
  TextInput,
} from "@mantine/core";

import classes from "./components.module.css";

const signalColors = colorsTuple([
  "#c1e1f7",
  "#c1e1f7",
  "#c1e1f7",
  "#c1e1f7",
  "#3ba6f1",
  "#3ba6f1",
  "#3ba6f1",
  "#3398e1",
  "#3398e1",
  "#3398e1",
]);

export const theme = createTheme({
  autoContrast: true,
  black: "var(--color-ink-black)",
  white: "var(--color-pure-white)",
  primaryColor: "signal",
  primaryShade: { light: 6, dark: 5 },
  colors: {
    signal: signalColors,
  },
  fontFamily: "var(--font-inter)",
  fontSizes: {
    xs: "var(--text-caption)",
    sm: "var(--text-body-lg)",
    md: "var(--text-body-lg)",
    lg: "var(--text-subheading)",
    xl: "var(--text-heading-sm)",
  },
  lineHeights: {
    xs: "var(--leading-caption)",
    sm: "var(--leading-body-lg)",
    md: "var(--leading-body-lg)",
    lg: "var(--leading-subheading)",
    xl: "var(--leading-heading-sm)",
  },
  headings: {
    fontFamily: "var(--font-roobert)",
    fontWeight: "var(--font-weight-semibold)",
    textWrap: "balance",
    sizes: {
      h1: {
        fontSize: "var(--text-display)",
        lineHeight: "var(--leading-display)",
        fontWeight: "var(--font-weight-semibold)",
      },
      h2: {
        fontSize: "var(--text-heading-sm)",
        lineHeight: "var(--leading-heading-sm)",
        fontWeight: "var(--font-weight-semibold)",
      },
      h3: {
        fontSize: "var(--text-subheading)",
        lineHeight: "var(--leading-subheading)",
        fontWeight: "var(--font-weight-medium)",
      },
    },
  },
  spacing: {
    xs: "var(--spacing-4)",
    sm: "var(--spacing-8)",
    md: "var(--spacing-16)",
    lg: "var(--spacing-24)",
    xl: "var(--spacing-32)",
  },
  radius: {
    xs: "var(--radius-icons)",
    sm: "var(--radius-inputs)",
    md: "var(--radius-cards)",
    lg: "var(--radius-feature-card)",
    xl: "var(--radius-full)",
  },
  defaultRadius: "md",
  shadows: {
    xs: "var(--shadow-subtle)",
    sm: "var(--shadow-sm)",
    md: "var(--shadow-md)",
    xl: "var(--shadow-xl)",
  },
  focusRing: "auto",
  respectReducedMotion: true,
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: { root: classes.actionIcon },
      defaultProps: { radius: "xs" },
    }),
    Button: Button.extend({
      classNames: { root: classes.button },
      defaultProps: { radius: "xl" },
    }),
    Paper: Paper.extend({
      classNames: { root: classes.paper },
      defaultProps: { radius: "md" },
    }),
    SegmentedControl: SegmentedControl.extend({
      classNames: {
        indicator: classes.segmentedIndicator,
        label: classes.segmentedLabel,
        root: classes.segmentedRoot,
      },
      defaultProps: { autoContrast: true, color: "signal", radius: "xl" },
    }),
    TextInput: TextInput.extend({
      classNames: { input: classes.textInput },
      defaultProps: { radius: "sm" },
    }),
  },
});
