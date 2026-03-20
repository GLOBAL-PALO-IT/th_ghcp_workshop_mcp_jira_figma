---
applyTo: "emission-factor-app/*"
---
# React Project Structure Rules

- Organize code directly under src with folders for components, hooks, services, and styles.
- Keep shared UI in src/shared/components and shared utilities in src/shared/utils.
- Root App.jsx handles app bootstrap concerns only.
- Place main module logic (EmissionFactorsModule.jsx) at src level.
- Do not place business logic in presentational components.
- Keep files small and focused on one responsibility.
- Prefer named exports for reusable modules.
- Keep import paths stable and predictable by folder ownership.
