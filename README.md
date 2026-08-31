<div align="center">

# Quest Game

**A story-driven space adventure played through an interactive web terminal.**

Explore an abandoned complex, solve a riddle, survive the darkness, and find a way off the planet.

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-9-339AF0)

</div>

## About the game

Quest Game is a small interactive-fiction adventure. After crash-landing on the mysterious planet Mephistocles-7, you wake up inside a damaged F-5 Starlight with almost no power left. Somewhere beyond the ship lies the energy module you need to escape—but the path to it is locked, dark, and dangerous.

The game was originally written in C# and later rebuilt in TypeScript as a learning project. Its current version runs in React, uses Mantine components and typed design tokens, and supports Russian and English without resetting the adventure.

## Features

- A complete branching terminal adventure
- Six connected locations to explore
- Inventory-based progression with a key and an energy module
- Input validation for every numbered choice
- A riddle with case-insensitive answer checking
- Separate victory and death outcomes
- Strict TypeScript configuration
- A React, Vite, and Mantine web foundation
- A framework-independent, immutable TypeScript game engine
- Unit-tested victory, death, validation, inventory, and restart flows
- Complete typed Russian and English translations
- Persistent language selection with browser-language detection
- A responsive Mantine AppShell with semantic header, main, and footer regions
- An interactive, responsive web terminal with contextual commands
- Automatic history scrolling and focus management
- An accessible live game log and keyboard-friendly HTML form
- Restart controls for both victory and death outcomes
- Token-based light and dark themes with system-theme detection
- Persistent, localized, and keyboard-accessible theme controls

## Requirements

- [Node.js](https://nodejs.org/) 20.19 or newer, or 22.12 or newer
- npm 10 or newer

## Getting started

Clone the repository, install the development dependencies, and start the game:

```bash
git clone https://github.com/yamkin29/Quest_Game.git
cd Quest_Game
npm install
npm run dev
```

Vite prints the local development URL. Open it in a browser and use the command field to play. Press Enter to continue or submit a choice; the available actions are always shown in the terminal history.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run check` | Check formatting, lint rules, and import order with Biome |
| `npm run check:fix` | Format files and apply safe lint/import fixes |
| `npm run format` | Format all supported files |
| `npm run format:check` | Check formatting without changing files |
| `npm run lint` | Run the Biome linter |
| `npm run typecheck` | Check all TypeScript types without creating output |
| `npm test` | Run the game-engine and localization unit tests once |
| `npm run test:watch` | Run the unit tests in watch mode |
| `npm run build` | Type-check and create a production web build |
| `npm run preview` | Preview the production web build locally |
| `npm run validate` | Run Biome, tests, type-checking, and production build |

For a production-style run:

```bash
npm run build
npm run preview
```

## Project structure

```text
Quest_Game/
├── src/
│   ├── app/            # React application shell
│   ├── components/     # Reusable layout components
│   ├── features/game/  # Pure engine, React adapter, terminal UI, and tests
│   ├── hooks/          # Persistent language state
│   ├── i18n/           # Typed RU/EN dictionaries and translator
│   ├── providers/      # Mantine provider composition
│   ├── theme/          # Theme adapter and design tokens
│   ├── styles/         # Global browser styles
│   └── main.tsx        # Browser entry point
├── docs/               # Implementation plan and design system
├── index.html
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Architecture

The web game is driven by one immutable, explicitly typed state object:

```ts
interface GameState {
  room: Room;
  status: GameStatus;
  inputMode: InputMode;
  sceneStep: number;
  hasKey: boolean;
  hasModule: boolean;
  messages: readonly GameMessage[];
}
```

`submitCommand(state, command)` returns a new state instead of mutating its input. `getScene(state)` describes the available actions for the current room, including inventory-dependent options. The engine imports neither React nor browser APIs, so it stays independently testable.

The `useGame` hook connects this engine to React through `useReducer`. The terminal components only render the current state and dispatch typed `submit` or `restart` actions, keeping gameplay rules outside the UI.

Messages contain typed translation keys rather than rendered strings. Both dictionaries must satisfy the complete key union, so TypeScript reports missing or unknown translations. Rendering translates each key against the current locale, allowing the entire existing history to switch languages without resetting the game.

The selected locale is stored under the versioned `quest-game.locale.v1` key and synchronized with the document's `lang` attribute. English browser locales default to English; Russian and unsupported locales default to Russian.

Mantine `AppShell` provides fixed Header and Footer offsets around the central Main region. `App` owns the language state and passes typed props to the layout components, keeping them independent from browser storage.

The central terminal uses a native HTML form for keyboard submission and a Mantine `ScrollArea` for history. New messages are exposed as an accessible live log, the view follows the latest output, and focus returns to the next relevant control after every action.

Mantine is configured at the application root, and the supplied design tokens are mapped to its theme and semantic light/dark CSS variables. The first visit follows the operating-system color scheme; an explicit light or dark choice is persisted under `quest-game.color-scheme.v1`.

## TypeScript concepts demonstrated

- String union types
- Interfaces and typed state
- Readonly state and immutable updates
- Pure state-transition functions
- `Record`, `satisfies`, and type-safe translation keys
- Runtime type guards for persisted data
- Template parameter interpolation
- Component composition and typed props
- Reducer actions and React `useReducer`
- Controlled form inputs and submit events
- Refs and effects for DOM focus and scrolling
- Accessible live regions
- Mantine compound components
- ES modules
- Type-only imports
- Input parsing and validation
- Exhaustive state-based control flow

## Development

Before submitting changes, run all checks:

```bash
npm run validate
```

Biome handles formatting, recommended lint rules, and import organization. Use `npm run check:fix` to apply safe automatic fixes; it replaces separate ESLint and Prettier setup for this project.

The TypeScript compiler uses strict mode together with additional checks such as `noUncheckedIndexedAccess` and `noImplicitReturns`.

---

<div align="center">

**Can you escape Mephistocles-7?**

</div>
