import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

import "@testing-library/jest-dom/vitest";

// RTL registers auto-cleanup through the global afterEach, which does not
// exist unless vitest globals are enabled.
afterEach(() => {
  if (typeof window !== "undefined") {
    cleanup();
  }
});

// React reports warnings through console.error; turn them into hard failures
// so component tests cannot pass with rendering problems.
const originalConsoleError = console.error.bind(console);

console.error = (...args: unknown[]) => {
  originalConsoleError(...args);

  const first = args[0];

  if (typeof first === "string" && first.startsWith("Warning:")) {
    throw new Error(`React warning leaked into a test: ${first}`);
  }
};

if (typeof window !== "undefined") {
  // Mantine polls matchMedia when resolving the color scheme.
  window.matchMedia ??= ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;

  // ScrollArea relies on ResizeObserver, which jsdom does not implement.
  window.ResizeObserver ??= class {
    observe() {}

    unobserve() {}

    disconnect() {}
  } as unknown as typeof ResizeObserver;

  // jsdom has no real layout, so programmatic scrolling is a no-op.
  window.HTMLElement.prototype.scrollTo = () => {};
  window.HTMLElement.prototype.scrollIntoView = () => {};
}
