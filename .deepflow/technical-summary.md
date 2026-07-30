# Claude Quiz Frontend — Technical Summary

## Tech Stack

### Frontend
| Layer | Technology | Version |
|---|---|---|
| UI Framework | React | ^19.2.8 |
| Language | TypeScript | ~6.0.2 |
| Build Tool / Dev Server | Vite | ^8.2.0 |
| Vite React Plugin | @vitejs/plugin-react | ^6.0.4 |
| Styling | Vanilla CSS (custom properties, no UI library) | — |

### No backend included in this repository
The frontend communicates with an external REST API (defaulting to `http://localhost:8000`). No backend code, ORM, or database layer exists in this repo.

---

## Development Tooling

| Tool | Purpose |
|---|---|
| **npm** | Package manager (lockfile: `package-lock.json`) |
| **Vite** | Development server with HMR; production bundler |
| **TypeScript (tsc)** | Static type checking; compiled as part of the build step |
| **oxlint** | Fast Rust-based linter (replaces ESLint) with React and TypeScript plugins |
| **`tsconfig.json` + references** | Composite TypeScript project with separate `tsconfig.app.json` and `tsconfig.node.json` targets |

No CI/CD pipelines, Dockerfiles, or deployment manifests are present in the repository.

---

## Architecture Overview

**Single-Page Application (SPA) — Monolithic frontend.**

The entire application is a single React component tree rendered into one HTML page. Navigation between screens is handled by a `View` union type managed in `App.tsx` state — there is no client-side router (no React Router, TanStack Router, etc.). All remote data fetching is done via the native `fetch` API.

```
Browser
  └── React SPA (Vite bundle)
        └── App.tsx  (global state + view switching)
              ├── Login
              ├── Welcome
              ├── Quiz
              ├── Results
              └── Leaderboard
                    │
                    └── api.ts (fetch wrappers → REST API)
```

---

## Key Design Patterns

- **State Machine (View-based routing):** A `View` type (`"login" | "welcome" | "quiz" | "results" | "leaderboard"`) drives which component is rendered. Transitions are explicit function calls in `App.tsx`.
- **Prop Drilling / Callback Pattern:** All shared state lives in `App`; child components receive data and callback functions as props — no global state library (Redux, Zustand, Context API) is used.
- **Thin API Layer:** `src/api.ts` centralises all HTTP calls behind typed wrapper functions, keeping fetch logic out of components.
- **Typed Data Contracts:** `src/types.ts` defines all shared interfaces (`Question`, `Quiz`, `SubmitResponse`, `LeaderboardEntry`, etc.), ensuring type safety across the API boundary.
- **Controlled Forms:** The `Login` component uses controlled input with local `useState`, validated before calling the parent callback.
- **`useMemo` for derived state:** `Quiz.tsx` uses `useMemo` to compute the current progress percentage, avoiding unnecessary recalculations on each render.
- **CSS Custom Properties:** Design tokens (colours, border styles, muted text) are defined as CSS variables in `index.css` and `App.css`, applied consistently across all components.

---

## Directory Structure

```
claude-quiz-frontend/
├── public/
│   ├── favicon.svg          # App favicon
│   └── icons.svg            # SVG icon sprites
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   ├── components/
│   │   ├── Leaderboard.tsx  # Ranked scores table
│   │   ├── Login.tsx        # Name entry form
│   │   ├── Quiz.tsx         # Question + navigation UI
│   │   ├── Results.tsx      # Score summary + review
│   │   └── Welcome.tsx      # Personalised intro + domain list
│   ├── App.css              # Application-wide styles
│   ├── App.tsx              # Root component + global state
│   ├── api.ts               # HTTP client (fetch wrappers)
│   ├── index.css            # CSS reset + design tokens
│   ├── main.tsx             # React DOM entry point
│   └── types.ts             # Shared TypeScript interfaces
├── .env.example             # Environment variable template
├── .oxlintrc.json           # Linter configuration
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Key Modules / Services

### `src/App.tsx`
Root component. Owns all application state (`view`, `playerName`, `questions`, `result`, `leaders`, loading/error flags). Orchestrates transitions between views and calls API functions on user actions.

### `src/api.ts`
Thin HTTP abstraction layer. Exports four typed async functions:
- `fetchWelcome(playerName)` — `GET /api/welcome/:name`
- `fetchQuiz()` — `GET /api/quiz`
- `submitQuiz(playerName, answers)` — `POST /api/quiz/submit`
- `fetchLeaderboard(limit)` — `GET /api/leaderboard?limit=N`

All requests include `Content-Type: application/json`; non-2xx responses are converted to `Error` objects with the backend's `detail` field.

### `src/types.ts`
Central type definitions for all data structures exchanged with the backend: `Question`, `Quiz`, `AnswerItem`, `AnswerResult`, `SubmitResponse`, `LeaderboardEntry`, `Leaderboard`, `Welcome`, and the `View` discriminated union.

### `src/components/Quiz.tsx`
Manages per-question navigation (`current` index), answer selection (keyed by `question.id`), progress bar, dot navigation, and final submission. Enforces that all questions must be answered before the submit button is enabled.

### `src/components/Results.tsx`
Renders a score ring (colour-coded: orange for < 70%, green for ≥ 70%), a per-question review list (Correcta / Incorrecta badges, correct answer letter, and explanation text), and action buttons (Retry, Leaderboard, Home).

### `src/components/Leaderboard.tsx`
Displays a responsive HTML table of top entries ranked by percentage. Top-3 ranks receive gold/silver/bronze styling. Supports a manual refresh action.

---

## External Integrations

| Integration | Details |
|---|---|
| **Backend REST API** | Configurable via `VITE_API_URL` env var (default: `http://localhost:8000`). Four endpoints are consumed (welcome, quiz fetch, quiz submit, leaderboard). |
| **No third-party UI or analytics services** | All styles are hand-written; no tracking scripts are present. |

The backend is a separate service (not in this repository). Based on the API contract, it is expected to manage question storage, answer grading, explanation generation, score persistence, and leaderboard queries.

---

## Deployment

No deployment configuration (Dockerfile, docker-compose, CI/CD pipeline, or cloud manifests) is included in this repository. The production build is generated with:

```bash
npm run build   # tsc -b && vite build → outputs to dist/
npm run preview # local preview of the dist/ bundle
```

The resulting `dist/` directory is a static site that can be served by any static hosting provider (e.g. Netlify, Vercel, GitHub Pages, NGINX). The `VITE_API_URL` environment variable must be set at build time to point to the production backend.

---

## Testing Approach

**No automated tests are present in this repository.** There are no test files, no testing framework dependencies (Vitest, Jest, Testing Library, Playwright, Cypress), and no test scripts in `package.json`. Quality is enforced solely through TypeScript's static type checker and the oxlint linter.

---

## Dependencies

### Runtime Dependencies
| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.8 | UI component model and rendering |
| `react-dom` | ^19.2.8 | DOM renderer for React |

### Dev Dependencies
| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.2.0 | Dev server + production bundler |
| `@vitejs/plugin-react` | ^6.0.4 | Vite plugin for React JSX/Fast Refresh |
| `typescript` | ~6.0.2 | Static typing and compilation |
| `oxlint` | ^1.75.0 | Rust-based linter for JS/TS/React |
| `@types/react` | ^19.2.17 | TypeScript types for React |
| `@types/react-dom` | ^19.2.3 | TypeScript types for React DOM |
| `@types/node` | ^24.13.3 | TypeScript types for Node.js APIs |
