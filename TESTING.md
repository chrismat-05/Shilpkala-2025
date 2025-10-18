# Testing Documentation

This project includes comprehensive testing coverage with unit tests, E2E tests, and visual regression tests.

## Test Types

### Unit Tests (Vitest + React Testing Library)

Unit tests are located alongside the components and hooks they test.

**Running Unit Tests:**
```bash
npm run test        # Run tests in watch mode
npm run test:run    # Run tests once
npm run test:ui     # Run tests with UI
npm run test:coverage  # Run tests with coverage report
```

**Test Coverage:**
- `EventCard.test.tsx` - Tests EventCard component
  - Disabled state rendering
  - Link behavior when enabled/disabled
  - Badge display
  - Image rendering
  - Styling

- `EventCarousel.test.tsx` - Tests EventCarousel component
  - Event rendering
  - Navigation arrow clicks
  - Disabled/enabled states
  - Empty state handling

- `useAutoRefresh.test.tsx` - Tests useAutoRefresh hook
  - Initial data fetching
  - Refetch interval behavior
  - Error handling
  - Custom interval configuration

### E2E Tests (Playwright)

E2E tests are located in the `/e2e` directory.

**Running E2E Tests:**
```bash
npm run test:e2e      # Run E2E tests
npm run test:e2e:ui   # Run E2E tests with UI
```

**Test Coverage:**
- `index.spec.ts` - Tests Index page carousels
  - Manual carousel navigation
  - Auto-advance functionality
  - All carousel sections visibility

- `registrations.spec.ts` - Tests Registrations page
  - API data refresh within 30s
  - Loading state
  - Refresh indicator

- `api-fallback.spec.ts` - Tests API error handling
  - 5xx error fallback to cache
  - Complete API failure handling
  - Recovery from temporary failures

### Visual Regression Tests (Storybook + Chromatic)

Stories are located alongside components as `.stories.tsx` files.

**Running Storybook:**
```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build static Storybook
```

**Running Visual Regression Tests:**
```bash
npm run chromatic  # Run Chromatic visual regression tests
```

**Note:** You need to set up a Chromatic project and update the `projectId` in `chromatic.config.json`.

**Story Coverage:**
- `EventCard.stories.tsx` - EventCard variations
  - Default state
  - With/without image
  - Disabled state
  - With/without description

- `EventCarousel.stories.tsx` - EventCarousel variations
  - Default carousel
  - Single/multiple events
  - All open/closed states
  - Different autoplay speeds

## CI/CD Integration

All tests can be run in CI/CD pipelines:

```bash
# Run all tests
npm run lint
npm run test:run
npm run build
npm run test:e2e
npm run chromatic
```

## Test Best Practices

1. **Unit Tests**: Focus on component logic and user interactions
2. **E2E Tests**: Test complete user flows and API integrations
3. **Visual Tests**: Catch UI regressions across all component states

## Troubleshooting

### Playwright Browser Installation
If Playwright browsers fail to install, try:
```bash
npx playwright install chromium
```

### Storybook Build Issues
If Storybook build fails, ensure all dependencies are installed:
```bash
npm install
```
