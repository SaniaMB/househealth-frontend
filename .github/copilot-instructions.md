# HouseHealth Frontend - Copilot Instructions

## Project Overview
HouseHealth is a family health companion app that enables household members to track health symptoms, share updates with family, and stay connected. Built with React + Vite, it features real-time notifications, health logging, trends analysis, and family management.

## Build, Test & Development Commands

### Development Server
```bash
npm run dev
```
Starts Vite dev server with HMR on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized production bundle in `/dist`

### Lint Code
```bash
npm run lint
```
Runs ESLint with React hooks and refresh rules (ESLint flat config)

### Preview Production Build Locally
```bash
npm run preview
```
Serve the production build locally for testing

## Architecture & Key Concepts

### Project Structure
```
src/
├── pages/              # Route components (auth, dashboard, family, etc)
├── components/         # Reusable UI components
│   ├── navigation/    # AppHeader, BottomNav
│   ├── dashboard/     # Dashboard-specific components
│   └── shared/        # ProtectedRoute, common components
├── layouts/           # MainLayout (authenticated pages)
├── services/          # API service layer
├── styles/            # CSS (one file per feature)
└── utils/             # Helper functions (errorUtils)
```

### Routing Architecture
- **Public routes**: `/`, `/login`, `/register`, `/verify`, `/forgot-password`, `/reset-password`
- **Protected routes**: Wrapped in `ProtectedRoute` component (checks localStorage token)
- **Protected layout**: All authenticated routes render within `MainLayout` which includes `AppHeader` and `BottomNav`
- ProtectedRoute enforces authentication by checking `token` in localStorage; redirects to login if missing

### Styling Strategy
- **CSS Modules**: Individual `.css` files per feature (global, landing, auth, dashboard, feed, etc)
- **Design System**: CSS custom properties defined in `:root` (colors, spacing, shadows, radius)
- **Color Palette**: Green healthcare theme
  - `--hh-green`: #3db562 (primary)
  - `--hh-green-deep`: #2a9e4f (hover/active)
  - `--hh-green-glow`: rgba(61, 181, 98, 0.18) (backgrounds)
- **Icons**: react-icons (io5 set primarily) - migrate to lucide-react for newer code
- **Responsive**: Mobile-first approach with BottomNav for mobile navigation

### API Integration
- **Base URL**: `http://localhost:8080` (defined in `services/api.js`)
- **Request/Response Format**: JSON with Authorization header (Bearer token)
- **Error Handling**: `getErrorMessage()` utility converts API errors to user-friendly messages
- **Services**: Dedicated service files for each domain (authService, healthLogService, familyService, etc)

### Authentication Flow
1. User logs in via `/login` → `loginUser()` returns JWT token
2. Token stored in localStorage as `"token"`
3. Token included in requests via `authHeader()` (Authorization: Bearer)
4. ProtectedRoute checks token existence; missing token redirects to `/login`
5. On logout, token is removed from localStorage

### Key Services & Endpoints
- **authService**: login, register, verifyEmail, requestPasswordReset, resetPassword
- **healthLogService**: create, retrieve health logs
- **familyService**: manage family groups, invite members
- **dashboardService**: fetch dashboard metrics and trends
- **notificationService**: fetch user notifications
- **reminderService**: manage health reminders
- **trendService**: analyze health trends
- **reportService**: generate health reports

## Code Conventions

### React Patterns
- **Functional components** with hooks (useState, useEffect, useContext)
- **Navigation**: Use React Router (navigate, Link)
- **Forms**: Uncontrolled inputs with state tracking; use react-hook-form for complex forms
- **Error handling**: Wrap API calls in try-catch; display errors in UI
- **Loading states**: Boolean `loading` state with button/spinner feedback

### CSS Naming
- **BEM-inspired**: `.page-container`, `.auth-form`, `.primary-btn`
- **State classes**: `.is-loading`, `.is-active`, `.is-error`
- **Utility classes**: `.text-center`, `.gap-24`, `.p-20`
- **Responsive**: Mobile-first media queries

### Import Organization
1. React/libraries (React, useState, useEffect)
2. React Router (useNavigate, Link, Routes)
3. React Icons (io5 set)
4. Local services/components
5. Styles (last)

### Component Organization
1. Props destructuring / state declarations
2. useEffect hooks
3. Event handler functions
4. Render/return JSX

## Important Implementation Notes

### Do NOT modify
- Backend API endpoints
- Request/response formats
- Authentication token handling (localStorage key and format)
- Routing structure (route paths and protected logic)

### When Adding Features
1. Create new service file if adding new API domain
2. Create reusable components in `/components` before using in multiple pages
3. Add corresponding CSS file in `/styles` (one per feature)
4. Update styles in `main.jsx` import list
5. Follow existing color/spacing conventions from design system
6. Test authentication flow not broken (ProtectedRoute, token handling)

### Mobile-First Design
- All layouts should work on mobile first (320px+)
- BottomNav appears on authenticated pages for mobile navigation
- Responsive breakpoints use standard media queries

### Performance Considerations
- Components re-render when props/state change; use `useCallback` for event handlers passed to children if needed
- Avoid creating objects/functions in render (memoize in state or outside component)
- Lazy load images and heavy components if performance needed

## Testing Approach
- No existing test suite configured (eslint-based validation only)
- Manual browser testing for feature validation
- Check console for errors when developing
- Test on mobile viewport (dev tools) for responsive design

## Debugging Tips
- Check localStorage for token: `localStorage.getItem('token')`
- Verify API base URL is correct: `services/api.js`
- Use React DevTools to inspect component state/props
- Check network tab for API calls and responses
- ESLint errors must be fixed before build (strict config)

## MCP Servers

### Playwright (Browser Automation & Testing)
Playwright is configured via MCP for browser testing, visual regression testing, and end-to-end testing:

**Installation:**
```bash
npm install -D @playwright/test
npx playwright install
```

**Basic E2E Test Example:**
```javascript
// tests/auth.spec.js
import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('http://localhost:5173/feed');
});
```

**Run Tests:**
```bash
npx playwright test
npx playwright test --ui  # Interactive mode
```

Use Playwright for:
- Login/authentication flow testing
- Navigation and routing validation
- Component interaction testing
- Visual regression detection
- Multi-device testing (mobile, desktop, tablet)
