---
applyTo: "emission-factor-app/*.{js,jsx}"
---
# React Code Pattern Rules

- Write functional components only.
- Keep render logic declarative and side-effect free.
- Move filtering, sorting, and pagination logic to hooks.
- Use pure utility functions in shared/utils for formatting and transformations.
- Keep state local by default; lift state only when required by multiple components.
- Use clear prop names and avoid boolean ambiguity.
- Return early for empty and loading states.
