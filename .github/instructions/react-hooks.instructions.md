---
applyTo: "emission-factor-app/src/hooks/**/*.js"
---
# Hooks Rules

- Hook names must start with use.
- Hooks should encapsulate state transitions and business rules, not UI markup.
- Use useMemo and useCallback only when it improves clarity or avoids expensive recalculation.
- Keep hook return shape explicit and stable.
- Expose handler functions with intent-based names such as onChangePage.
- Avoid side effects unless necessary; isolate effects with clear dependencies.
- Keep constants and defaults near the hook.
