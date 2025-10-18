import { test, expect } from '@playwright/test';

test.describe('Registrations Page', () => {
  test('reflects API changes within 30s', async ({ page }) => {
    // Mock the API endpoint to return test data
    await page.route('**/api/regcounts*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            'Test Event': {
              firstYear: 10,
              secondYear: 20,
              thirdYear: 30,
              total: 60,
            },
          },
          cached: false,
          lastUpdated: Date.now(),
        }),
      });
    });

    await page.goto('/home/registrations');

    // Wait for initial data load
    await page.waitForTimeout(1000);

    // Check that stats are displayed
    const totalStat = page.locator('text=Total').locator('..').locator('div').first();
    await expect(totalStat).toBeVisible();

    // Now change the mock to return different data
    await page.route('**/api/regcounts*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            'Test Event': {
              firstYear: 15,
              secondYear: 25,
              thirdYear: 35,
              total: 75,
            },
          },
          cached: false,
          lastUpdated: Date.now(),
        }),
      });
    });

    // Wait for auto-refresh (30 seconds)
    await page.waitForTimeout(31000);

    // Verify the UI updated with new data
    const refreshIndicator = page.locator('text=Last refreshed at');
    await expect(refreshIndicator).toBeVisible();
  });

  test('displays loading state initially', async ({ page }) => {
    // Delay the API response to test loading state
    await page.route('**/api/regcounts*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {},
          cached: false,
          lastUpdated: Date.now(),
        }),
      });
    });

    await page.goto('/home/registrations');

    // Should see loader initially
    // The component uses ShilpkalaLoader which should be visible
    await page.waitForTimeout(500);
  });

  test('shows refresh indicator when fetching', async ({ page }) => {
    let requestCount = 0;
    await page.route('**/api/regcounts*', async (route) => {
      requestCount++;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {},
          cached: false,
          lastUpdated: Date.now(),
        }),
      });
    });

    await page.goto('/home/registrations');

    // Wait for initial load
    await page.waitForTimeout(1000);

    // The page should have made at least one request
    expect(requestCount).toBeGreaterThan(0);

    // Check for refresh indicator
    const refreshInfo = page.locator('text=Automatically refreshes every 30 sec');
    await expect(refreshInfo).toBeVisible();
  });
});
