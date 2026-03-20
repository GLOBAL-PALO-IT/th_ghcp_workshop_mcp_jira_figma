---
applyTo: "emission-factor-app/src/services/**/*.js"
---
# Services Rules

- Service files own data access logic and data source contracts.
- Keep service functions pure and deterministic for mock/local data.
- Do not mix UI formatting with service layer data.
- Export small, composable functions.
- Keep mock data structures consistent with module usage.
