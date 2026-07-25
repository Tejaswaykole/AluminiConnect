# Authentication Module (Frontend Only)

## Overview
Phase 2 implemented the complete UI flow for Authentication. This module strictly handles frontend rendering, validation, and layout routing. All API connections and data persistence will be handled in later backend integration phases.

## Screen Hierarchy & Navigation Flow

1. **Splash Screen (`app/index.tsx`)**
   - Renders first on app load.
   - Redirects to Welcome Screen after 2s (mock load).

2. **Welcome Screen (`app/(public)/welcome.tsx`)**
   - Unauthenticated landing view.
   - Links: `-> Login` or `-> Register`.

3. **Login Screen (`app/(auth)/login.tsx`)**
   - Inputs: Email, Password.
   - Validates email format and password presence.
   - Links: 
     - `-> Forgot Password`
     - `-> Register` (if no account)
     - `-> /(public)` (Continue as Guest)
   - On mock success: `-> Dashboard (Placeholder)`.

4. **Register Screen (`app/(auth)/register.tsx`)**
   - Inputs: Full Name, Email, Password, Confirm Password.
   - Validates format, length (8+ chars), and password match.
   - Links: `-> Login` (if account exists).
   - On mock success: `-> Role Selection`.

5. **Role Selection Screen (`app/(auth)/role-selection.tsx`)**
   - Prevents moving to dashboard without assigning a role (Student, Alumni, Placement).
   - On select: `-> Respective Dashboard (Placeholder)`.

6. **Forgot Password Screen (`app/(auth)/forgot-password.tsx`)**
   - Inputs: Email.
   - Simulates sending a link and presents a mock button.
   - Links: `-> Reset Password` (for testing flow).

7. **Reset Password Screen (`app/(auth)/reset-password.tsx`)**
   - Inputs: New Password, Confirm Password.
   - Validates length and match.
   - On mock success: `-> Login`.

## Reusable Components
This module heavily utilizes the Phase 1 Design System components:
- `Typography` for all text elements.
- `Input` with custom `isPassword` prop injected to handle Native visibility toggle.
- `Button` for all primary/secondary actions with loading states (`isLoading`).
- `Card` for the selectable role items.
- `ScreenContainer` paired with `KeyboardAvoidingView` to ensure form accessibility on small devices while typing.
