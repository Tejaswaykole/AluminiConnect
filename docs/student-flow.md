# Student Module Flow

## Overview
Phase 3 established the complete frontend experience for students navigating the Alumni Connect platform. The module implements a robust Tab-based layout with nested stack navigation for details, heavily utilizing a centralized mock data strategy.

## Screen Architecture

### 1. Tab Navigation (`app/(student)/_layout.tsx`)
The primary navigation utilizes Expo Router's `Tabs` feature, providing persistent access to the five main pillars of the student experience:
- **Home (`index.tsx`)**: The Student Dashboard. Features quick actions, profile completion status, upcoming events, and job recommendations.
- **Alumni (`discover/index.tsx`)**: A directory of alumni with a reusable search and filtering interface (`SearchBar`, `FilterChip`).
- **Jobs (`opportunities/index.tsx`)**: Listings for internships and full-time roles.
- **Groups (`communities/index.tsx`)**: Networking groups and interest-based communities.
- **Profile (`profile/index.tsx`)**: The user's personal portfolio, featuring a toggleable edit mode for skills and bio.

### 2. Stack Screens (Nested Routes)
The following screens are pushed onto the navigation stack from the primary tabs, providing a seamless drill-down experience:
- **Alumni Details (`discover/[id].tsx`)**: Detailed view of an alumnus's experience and skills. Includes entry points to messaging or mentorship requests.
- **Opportunity Details (`opportunities/[id].tsx`)**: Deep dive into job requirements and descriptions.
- **Community Details (`communities/[id].tsx`)**: Community description and recent mock posts.
- **Events (`events/index.tsx` & `events/[id].tsx`)**: A dedicated listing and detail view for university-organized networking events.
- **Mentorship (`mentorship/index.tsx` & `mentorship/[id].tsx`)**: 
  - The index serves as a "My Mentors" dashboard to view active connections.
  - The `[id].tsx` route serves as the formal "Request Mentorship" intake form.
- **Notifications (`notifications/index.tsx`)**: A centralized feed for system alerts, mentorship updates, and event reminders.

## Mock Data Strategy
To prepare for Phase 4 (Backend Integration) while remaining purely frontend in Phase 3, all screen data is driven by structured arrays located in `src/mocks/index.ts`. 
- `CURRENT_USER`: Represents the logged-in student.
- `ALUMNI_MOCKS`: The network directory.
- `OPPORTUNITY_MOCKS`: Job listings.
- `EVENT_MOCKS`: Seminars and workshops.
- `COMMUNITY_MOCKS`: Groups.
- `NOTIFICATION_MOCKS`: System alerts.

## Reusable Components Introduced
To prevent UI duplication and enforce the Phase 1 Design System, the following new primitives were added to `src/components/`:
- **`Avatar`**: Handles profile images with a robust initial-fallback system.
- **`Badge`**: Status indicators and category pills (e.g., "Mentor", "Internship").
- **`SearchBar`**: A pre-styled text input tailored for discovery screens.
- **`FilterChip`**: Selectable, horizontal scroll items for categorizing lists.
- **`Section` & `ListItem`**: Layout wrappers used extensively on the dashboard and notifications screens.
