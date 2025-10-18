# Testing Structure Overview

## Directory Structure

```
Shilpkala-2025/
├── .github/
│   └── workflows/
│       └── test.yml                    # CI/CD workflow
├── .storybook/
│   ├── main.ts                         # Storybook configuration
│   └── preview.ts                      # Storybook preview settings
├── e2e/                                # E2E test directory
│   ├── api-fallback.spec.ts           # API error handling tests
│   ├── index.spec.ts                  # Index page carousel tests
│   └── registrations.spec.ts          # Registrations page tests
├── src/
│   ├── components/
│   │   ├── EventCard.test.tsx         # EventCard unit tests
│   │   ├── EventCard.stories.tsx      # EventCard stories
│   │   ├── EventCarousel.test.tsx     # EventCarousel unit tests
│   │   └── EventCarousel.stories.tsx  # EventCarousel stories
│   ├── hooks/
│   │   └── useAutoRefresh.test.tsx    # Hook unit tests
│   └── test/
│       └── setup.ts                   # Test setup file
├── chromatic.config.json              # Chromatic configuration
├── playwright.config.ts               # Playwright configuration
├── vite.config.ts                     # Vite + Vitest configuration
├── TESTING.md                         # Testing guide
├── TEST_SUMMARY.md                    # Detailed test summary
└── TESTING_STRUCTURE.md               # This file

```

## Test Coverage Matrix

| Component/Feature | Unit Tests | E2E Tests | Visual Tests |
|-------------------|-----------|-----------|--------------|
| EventCard | ✅ 7 tests | - | ✅ 6 stories |
| EventCarousel | ✅ 9 tests | ✅ 3 tests | ✅ 7 stories |
| useAutoRefresh | ✅ 4 tests | ✅ 3 tests | - |
| Index Page | - | ✅ 3 tests | - |
| Registrations | - | ✅ 3 tests | - |
| API Fallback | - | ✅ 4 tests | - |
| **Total** | **20** | **10** | **13** |

## Test Type Breakdown

### Unit Tests (Vitest + React Testing Library)
```
src/components/EventCard.test.tsx          [7 tests]
src/components/EventCarousel.test.tsx      [9 tests]
src/hooks/useAutoRefresh.test.tsx          [4 tests]
────────────────────────────────────────────────────
Total:                                     20 tests
Status:                                    ✅ All passing
```

### E2E Tests (Playwright)
```
e2e/index.spec.ts                          [3 tests]
e2e/registrations.spec.ts                  [3 tests]
e2e/api-fallback.spec.ts                   [4 tests]
────────────────────────────────────────────────────
Total:                                     10 tests
Status:                                    Ready to run
```

### Visual Regression Tests (Storybook)
```
src/components/EventCard.stories.tsx       [6 stories]
src/components/EventCarousel.stories.tsx   [7 stories]
────────────────────────────────────────────────────
Total:                                     13 stories
Status:                                    ✅ Configured
```

## Quick Start

### Run All Tests
```bash
# Install dependencies
npm install

# Run unit tests
npm run test:run

# Run E2E tests
npx playwright install chromium
npm run test:e2e

# Run Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## CI/CD Pipeline

The `.github/workflows/test.yml` workflow runs:

1. **Lint** → Check code quality
2. **Unit Tests** → Verify component logic
3. **Build** → Ensure production build works
4. **E2E Tests** → Validate user flows
5. **Visual Regression** → Detect UI changes

## Test Execution Flow

```
┌─────────────────┐
│   Code Change   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Unit Tests    │ ← Fast feedback (1-2s)
│   (Vitest)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Build Check   │ ← Verify production build
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   E2E Tests     │ ← Integration testing
│   (Playwright)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Visual Tests  │ ← UI regression detection
│   (Chromatic)   │
└────────┬────────┘
         │
         ▼
    ✅ Ready to Deploy
```

## Testing Best Practices Applied

✅ **Isolation** - Each test is independent
✅ **Mocking** - External dependencies are mocked
✅ **Coverage** - Key user interactions covered
✅ **Speed** - Unit tests run in under 2 seconds
✅ **Maintainability** - Tests are well-organized
✅ **Documentation** - Clear test descriptions
✅ **CI/CD** - Automated testing pipeline

## Key Testing Scenarios

### EventCard Component
- [x] Renders correctly in enabled state
- [x] Shows disabled state with badge
- [x] Links work when enabled
- [x] No link when disabled
- [x] Image rendering
- [x] Description display

### EventCarousel Component
- [x] Displays multiple events
- [x] Navigation arrows work
- [x] Auto-advance functionality
- [x] Handles empty states
- [x] Responsive behavior

### useAutoRefresh Hook
- [x] Fetches data initially
- [x] Refetches at interval
- [x] Handles errors gracefully
- [x] Custom interval support

### E2E Scenarios
- [x] Carousel navigation works
- [x] API refreshes within 30s
- [x] Fallback to cache on errors
- [x] Loading states display
- [x] Error recovery works

## Dependencies Added

```json
{
  "devDependencies": {
    "vitest": "^3.2.4",
    "@vitest/ui": "latest",
    "@testing-library/react": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/user-event": "latest",
    "jsdom": "latest",
    "@playwright/test": "latest",
    "storybook": "^8.6.14",
    "@storybook/react": "^8.6.14",
    "@storybook/react-vite": "^8.6.14",
    "@storybook/addon-essentials": "^8.6.14",
    "@storybook/addon-interactions": "^8.6.14",
    "@storybook/test": "^8.6.14",
    "chromatic": "latest"
  }
}
```

## Next Steps

1. **For Chromatic Setup:**
   - Sign up at https://www.chromatic.com/
   - Get project token
   - Update `chromatic.config.json`
   - Add `CHROMATIC_PROJECT_TOKEN` to GitHub secrets

2. **For Running E2E Tests:**
   - Install Playwright browsers: `npx playwright install`
   - Run tests: `npm run test:e2e`
   - View report: `npx playwright show-report`

3. **For Continuous Improvement:**
   - Add more test cases as features are added
   - Monitor test coverage
   - Update stories for new components
   - Maintain CI/CD pipeline
