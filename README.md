# Alumni Connect

This repository contains the front-end application for Alumni Connect.

## Architecture & Folder Structure

This project follows a feature-sliced design approach to maintain a scalable, maintainable, and modular codebase.

### Directory Layout

- `src/assets/`: Static assets such as images, global styles (`theme.css`), and fonts.
- `src/core/`: Application-wide configurations, constants, theme tokens, and base API clients.
- `src/shared/`: Highly reusable, domain-agnostic UI components (e.g., standard buttons, inputs), hooks, and types used across multiple features.
- `src/features/`: Feature-specific modules. Each feature (e.g., `auth`, `directory`) encapsulates its own components, logic, and state.
- `src/layouts/`: Structural page layouts (e.g., `MainLayout`, `AuthLayout`).
- `src/pages/`: Route-level components that compose features and layouts.
- `src/routes/`: Application routing configuration.

### UI Philosophy

The UI design language for this application is strict:
- **Minimal, Professional, Clean:** No heavy shadows, no glassmorphism, no complex gradient backgrounds.
- **Accessible & Responsive:** High contrast colors, semantic HTML, mobile-first design.
- **Fast & Easy to Use:** Performance is prioritized over decorative animations.

### Development Guidelines

1. **Never duplicate code:** Use `src/shared/` for reusable elements.
2. **Feature Cohesion:** Keep feature-specific logic within `src/features/[feature-name]/`.
3. **No Unrelated Changes:** When working on a task, do not modify files outside of that scope.
4. **Strict Types:** TypeScript strict mode is enabled. Use proper types and avoid `any`.

## Getting Started

1. `npm install`
2. `npm run dev`
