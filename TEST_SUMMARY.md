# Testing Implementation Summary

This document provides a comprehensive overview of the testing infrastructure implemented for the Shilpkala 2025 project.

## Overview

A full-blown testing suite has been implemented covering:
- ✅ **Unit Tests** with Vitest + React Testing Library
- ✅ **E2E Tests** with Playwright
- ✅ **Visual Regression Tests** with Storybook + Chromatic

## Implementation Details

### 1. Unit Tests (Vitest + React Testing Library)

**Configuration:**
- Test framework: Vitest v3.2.4
- Testing utilities: @testing-library/react
- Test setup: `src/test/setup.ts`
- Configuration: `vite.config.ts`

**Test Files Created:**
1. `src/components/EventCard.test.tsx` - 7 tests
   - ✅ Renders with title and description
   - ✅ Renders disabled state correctly
   - ✅ Renders enabled state with link correctly
   - ✅ Shows registration closed badge only when disabled
   - ✅ Applies correct styling when disabled
   - ✅ Renders with image when imageUrl is provided
   - ✅ Does not render image when imageUrl is not provided

2. `src/components/EventCarousel.test.tsx` - 9 tests
   - ✅ Renders all events
   - ✅ Renders navigation arrows
   - ✅ Calls scrollPrev when Previous button is clicked
   - ✅ Calls scrollNext when Next button is clicked
   - ✅ Renders disabled state for closed events
   - ✅ Renders register button for open events
   - ✅ Returns null when events array is empty
   - ✅ Returns null when events is undefined
   - ✅ Applies custom className when provided

3. `src/hooks/useAutoRefresh.test.tsx` - 4 tests
   - ✅ Fetches data initially
   - ✅ Uses default refetch interval of 30000ms when not specified
   - ✅ Handles errors gracefully
   - ✅ Respects custom refetch interval parameter

**Total: 20 unit tests - All passing ✅**

### 2. E2E Tests (Playwright)

**Configuration:**
- Test framework: Playwright
- Configuration: `playwright.config.ts`
- Browser: Chromium

**Test Files Created:**
1. `e2e/index.spec.ts` - Index Page Carousels
   - ✅ Carousels cycle through all slides
   - ✅ Auto-advance works on carousels
   - ✅ All three carousel sections are visible

2. `e2e/registrations.spec.ts` - Registrations Page
   - ✅ Reflects API changes within 30s
   - ✅ Displays loading state initially
   - ✅ Shows refresh indicator when fetching

3. `e2e/api-fallback.spec.ts` - API Error Handling
   - ✅ API 5xx falls back to last cache
   - ✅ Handles complete API failure gracefully
   - ✅ Recovers from temporary API failure

**Total: 10 E2E tests**

### 3. Visual Regression Tests (Storybook + Chromatic)

**Configuration:**
- Storybook version: 8.6.14
- Framework: React + Vite
- Configuration: `.storybook/main.ts` and `.storybook/preview.ts`

**Story Files Created:**
1. `src/components/EventCard.stories.tsx` - 6 stories
   - Default
   - With Image
   - Disabled
   - Without Description
   - Without Image
   - Disabled Without Image

2. `src/components/EventCarousel.stories.tsx` - 7 stories
   - Default
   - Single Event
   - Two Events
   - All Closed
   - All Open
   - Slow Autoplay
   - Fast Autoplay

**Total: 13 visual regression stories**

## Test Scripts

The following npm scripts have been added to `package.json`:

```bash
# Unit Tests
npm run test            # Run tests in watch mode
npm run test:run        # Run tests once
npm run test:ui         # Run tests with UI
npm run test:coverage   # Run tests with coverage

# E2E Tests
npm run test:e2e        # Run E2E tests
npm run test:e2e:ui     # Run E2E tests with UI

# Visual Regression
npm run storybook       # Start Storybook dev server
npm run build-storybook # Build static Storybook
npm run chromatic       # Run Chromatic visual regression tests
```

## CI/CD Integration

A GitHub Actions workflow has been created at `.github/workflows/test.yml` with three jobs:

1. **unit-tests** - Runs linting, unit tests, and build
2. **e2e-tests** - Runs E2E tests with Playwright
3. **visual-regression** - Publishes to Chromatic for visual regression testing

## Documentation

- `TESTING.md` - Complete testing guide with best practices
- `TEST_SUMMARY.md` - This document

## Key Features

### Unit Tests
- Mock embla-carousel-react for carousel testing
- Test disabled states and link behavior
- Validate refetch interval functionality
- Error handling coverage

### E2E Tests
- Mock API responses for testing
- Test 30-second auto-refresh behavior
- Validate cache fallback on 5xx errors
- Test carousel navigation and auto-advance

### Visual Regression
- Comprehensive component state coverage
- Multiple carousel configurations
- Disabled/enabled states
- Various autoplay speeds

## Test Results

All 20 unit tests pass successfully:
```
Test Files  3 passed (3)
Tests  20 passed (20)
Duration  1.86s
```

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run unit tests:
   ```bash
   npm run test:run
   ```

3. Run E2E tests (requires browser installation):
   ```bash
   npx playwright install chromium
   npm run test:e2e
   ```

4. Run Storybook:
   ```bash
   npm run storybook
   ```

5. For Chromatic visual regression testing:
   - Sign up at https://www.chromatic.com/
   - Get project token
   - Update `chromatic.config.json` with your project ID
   - Set `CHROMATIC_PROJECT_TOKEN` secret in GitHub
   - Run: `npm run chromatic`

## Notes

- E2E tests require the development server to be running or will start it automatically
- Chromatic requires a project token for visual regression testing
- All test artifacts (storybook-static, playwright-report, test-results) are gitignored
- ESLint is configured to ignore test build artifacts

## Coverage Areas

### Components
- ✅ EventCard (disabled state, links, styling)
- ✅ EventCarousel (navigation, auto-advance)

### Hooks
- ✅ useAutoRefresh (refetch interval, error handling)

### Pages
- ✅ Index (carousel functionality)
- ✅ Registrations (API refresh, caching)

### API
- ✅ API fallback behavior on errors
- ✅ Cache mechanism validation
