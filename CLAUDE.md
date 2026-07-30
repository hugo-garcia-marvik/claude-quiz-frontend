# Claude Quiz Frontend

## Stack overview
React 19 single-page application built with TypeScript and Vite, using vanilla CSS with custom properties for styling. State management is handled through React component props and callbacks without external libraries. All communication with the backend REST API is centralised through typed fetch wrappers. Development tooling includes oxlint for linting and TypeScript for static type checking.

## Active skills
| Skill | Purpose | Category |
|---|---|---|
| `clean-code` | Write pragmatic, maintainable code following SRP, DRY, KISS principles with clear naming and focused functions | Code Quality |
| `code-reviewer` | Review pull requests, identify issues, ensure quality standards across TypeScript/JavaScript code | Code Quality |
| `frontend-design` | Create distinctive, production-grade frontend interfaces with high design quality and creative aesthetics | Design |
| `react-best-practices` | Apply React performance optimization guidelines and component rendering best practices | Frontend |
| `scroll-experience` | Build scroll-driven interactive experiences with parallax effects and scroll-triggered animations | Frontend |
| `senior-architect` | Design scalable system architecture, component hierarchies, and dependency patterns | Architecture |
| `senior-frontend` | Comprehensive frontend development with React, TypeScript, performance optimization, and UI best practices | Frontend |
| `senior-qa` | Design test strategies, E2E testing, coverage analysis, and quality metrics | Testing |
| `software-architecture` | Apply Clean Architecture and Domain-Driven Design principles to code organization | Architecture |
| `tailwind-patterns` | Utility-first CSS development patterns and responsive design strategies | Styling |
| `test-driven-development` | Write tests before implementation code to ensure correctness and maintainability | Testing |
| `web-performance-optimization` | Improve loading speed, Core Web Vitals, bundle size, and runtime performance | Performance |

## Cross-skill patterns

- **frontend-web-experience:** Combine `frontend-design`, `react-best-practices`, `senior-frontend`, `tailwind-patterns`, and `web-performance-optimization` to deliver high-quality, performant React components with modern CSS practices.
- **scroll-interactive-narrative:** Apply `scroll-experience` with `frontend-design`, `react-best-practices`, and `web-performance-optimization` to build immersive scroll-driven UI elements within the quiz and results screens.
- **code-quality-architecture:** Use `clean-code`, `code-reviewer`, and `software-architecture` together to maintain consistent code structure, enforce standards via review, and ensure the component and API layer remain maintainable as the quiz grows.
- **accessibility-quality-testing:** Combine `senior-qa`, `code-reviewer`, `test-driven-development`, and `senior-frontend` to establish comprehensive testing strategies for the quiz flows, form validation, and leaderboard rendering.

## Architectural notes

- **Centralise API contracts in `types.ts` and `api.ts`** (`senior-architect` + `software-architecture`): Keep all HTTP logic and type definitions isolated from components. This reduces coupling and makes the external API contract a single source of truth, enabling easier refactoring or backend migration.

- **Enforce component composition over prop drilling** (`senior-frontend` + `react-best-practices`): As the quiz feature set expands, consider lifting deeply nested callbacks into a context-based event dispatcher or a simple state reducer to avoid excessive prop threading while maintaining the explicit data flow already established.

- **Apply TDD to form validation and API error handling** (`test-driven-development` + `clean-code`): Write tests for `Login` controlled input validation and API failure scenarios before refining the error messaging and retry logic. This prevents regressions in critical user paths.

- **Optimise bundle and runtime performance via `useMemo` and component code-splitting** (`react-best-practices` + `web-performance-optimization`): Extend the existing `useMemo` pattern in `Quiz.tsx` to memoize callback functions in parent components; consider lazy-loading heavy quiz components if they grow beyond ~50 KB.

- **Use CSS custom properties systematically for design tokens** (`tailwind-patterns` + `frontend-design`): Expand `index.css` and `App.css` to define a comprehensive token system (spacing, typography, shadows, transitions). This enables consistent theming and makes future design iterations faster.

- **Code review for performance and correctness** (`code-reviewer` + `senior-qa`): Establish a lightweight review checklist covering TypeScript type safety, React re-render pitfalls (missing dependencies, inline function creation), and API error paths before merging quiz feature PRs.

## Gotchas

- **No client-side router:** Navigation is driven by a `View` union type in `App.tsx` state. If the quiz grows beyond five screens, consider adopting a lightweight router (React Router, TanStack Router) to avoid unmanageable state complexity in `App.tsx`.
- **Prop drilling at scale:** The current callback-driven prop pattern works well for a small monolithic component tree, but will become unwieldy if the quiz feature set expands significantly. Plan to introduce context or a state management library if the component depth exceeds three levels.
- **No error boundary:** If an API call fails or a component crashes, the entire SPA may freeze. Add a top-level error boundary in `App.tsx` to catch and display errors gracefully.
- **API timeout and retry logic missing:** The thin `api.ts` layer has no built-in retry or timeout handling. Add these primitives early to handle network flakiness in production.
- **CSS custom properties require broad browser support:** The design tokens in `index.css` rely on CSS variables; ensure target browser versions (iOS Safari, older Android Chrome) support them, or provide fallbacks.
- **TypeScript composite project configuration:** `tsconfig.json` references separate app and node configs. If dependencies or build tools change, verify both targets compile cleanly to avoid confusing build errors.