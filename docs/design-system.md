# Design System & Theme Foundation

## UI Philosophy
This project strictly adheres to a **Minimal, Professional, Clean, and Accessible** design system.
We utilize `NativeWind` to map Tailwind CSS utility classes to React Native styles.

## Theming (tailwind.config.js)
Our centralized theme avoids generic values and focuses on high contrast and readable layouts.

### Color Palette
- **Primary:** `text-primary`, `bg-primary` (Blue 600)
- **Secondary:** `bg-secondary` (Slate 600)
- **Backgrounds:** `bg-background` (White), `bg-background-surface` (Slate 50)
- **Text:** `text-text` (Slate 900), `text-text-muted` (Slate 500)
- **Status:** `text-status-success`, `text-status-error`

### Typography (src/components/Typography.tsx)
Always use the `Typography` component instead of React Native's raw `Text`.
It supports predefined variants:
- `h1`: 4xl bold
- `h2`: 2xl semibold
- `h3`: xl medium
- `body`: base normal
- `caption`: sm normal

### Form & Interaction Elements
- **Buttons (src/components/Button.tsx):** Use standard variants (`primary`, `secondary`, `outline`, `ghost`). Avoid custom paddings unless necessary.
- **Inputs (src/components/Input.tsx):** Standardized input with border handling for error states.
- **Containers (src/components/Card.tsx):** Use `Card` for isolated content blocks. They utilize a very subtle shadow and a crisp border radius (`rounded`).

## Responsive Strategy
- **Mobile-first:** All default tailwind classes (`p-4`, `flex-col`) apply to mobile.
- **Larger Screens:** Use breakpoints (`md:flex-row`) only when the layout genuinely needs to expand for tablet/desktop usage on web.
- **Safe Area:** Screens should be wrapped in `ScreenContainer` to automatically handle safe area insets on mobile devices (notches, home indicators) without breaking web layouts.

## Strict Restrictions
- **NO Gradients.**
- **NO Heavy Drop Shadows.** Use the default `shadow-sm` or `shadow`.
- **NO Decorative Animations.** Animations are reserved for interactive feedback (e.g., button opacity changes).
