import { test, expect } from '@playwright/test';

test.describe('API Fallback to Cache', () => {
  test('API 5xx falls back to last cache', async ({ page }) => {
    let requestCount = 0;
    const cachedData = {
      'Cached Event': {
        firstYear: 5,
        secondYear: 10,
        thirdYear: 15,
        total: 30,
      },
    };

    await page.route('**/api/regcounts*', async (route) => {
      requestCount++;

      if (requestCount === 1) {
        // First request succeeds and creates cache
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: cachedData,
            cached: false,
            lastUpdated: Date.now(),
          }),
        });
      } else {
        // Subsequent requests return 5xx but with cached data (as per regCounts.js logic)
        await route.fulfill({
          status: 200, // Server returns 200 with cached data on error
          contentType: 'application/json',
          body: JSON.stringify({
            data: cachedData,
            cached: true,
            lastUpdated: Date.now() - 60000, // 1 minute old
            error: 'remote fetch failed',
          }),
        });
      }
    });

    await page.goto('/home/registrations');

    // Wait for initial data load
    await page.waitForTimeout(2000);

    // Verify data is displayed from first successful request
    const refreshInfo = page.locator('text=Automatically refreshes every 30 sec');
    await expect(refreshInfo).toBeVisible();

    // Wait for auto-refresh to trigger (this will hit the "error" response)
    await page.waitForTimeout(31000);

    // Page should still be functional and showing cached data
    await expect(refreshInfo).toBeVisible();

    // Verify multiple requests were made
    expect(requestCount).toBeGreaterThan(1);
  });

  test('handles complete API failure gracefully', async ({ page }) => {
    // Mock complete API failure
    await page.route('**/api/regcounts*', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({
          error: 'Failed to fetch remote counts',
        }),
      });
    });

    await page.goto('/home/registrations');

    // Wait a bit for the error state
    await page.waitForTimeout(2000);

    // Should show error message
    const errorMessage = page.locator('text=Failed to fetch registration data');
    await expect(errorMessage).toBeVisible();
  });

  test('recovers from temporary API failure', async ({ page }) => {
    let requestCount = 0;

    await page.route('**/api/regcounts*', async (route) => {
      requestCount++;

      if (requestCount === 1) {
        // First request fails
        await route.fulfill({
          status: 502,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'Failed to fetch remote counts',
          }),
        });
      } else {
        // Second request succeeds
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            data: {
              'Recovered Event': {
                firstYear: 3,
                secondYear: 6,
                thirdYear: 9,
                total: 18,
              },
            },
            cached: false,
            lastUpdated: Date.now(),
          }),
        });
      }
    });

    await page.goto('/home/registrations');

    // Wait for error state
    await page.waitForTimeout(1000);

    // Should initially show error
    const errorMessage = page.locator('text=Failed to fetch registration data');
    await expect(errorMessage).toBeVisible();

    // Reload page to trigger recovery
    await page.reload();
    await page.waitForTimeout(2000);

    // Should now show data
    const refreshInfo = page.locator('text=Automatically refreshes every 30 sec');
    await expect(refreshInfo).toBeVisible();
  });
});
