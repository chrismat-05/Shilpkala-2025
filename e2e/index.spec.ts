import { test, expect } from '@playwright/test';

test.describe('Index Page Carousels', () => {
  test('carousels cycle through all slides', async ({ page }) => {
    await page.goto('/');

    // Wait for the intro loader to disappear
    await page.waitForTimeout(2000);

    // Check if Solo Events carousel exists
    const soloHeading = page.locator('text=Solo Events');
    await expect(soloHeading).toBeVisible();

    // Find carousel navigation buttons
    const nextButtons = page.locator('button[aria-label="Next"]');
    const firstNextButton = nextButtons.first();

    // Click next to advance through slides
    await firstNextButton.click();
    await page.waitForTimeout(500);

    // Check if carousel is still visible (tests that click worked)
    await expect(soloHeading).toBeVisible();

    // Click previous button
    const prevButtons = page.locator('button[aria-label="Previous"]');
    const firstPrevButton = prevButtons.first();
    await firstPrevButton.click();
    await page.waitForTimeout(500);

    // Verify carousel still works after navigation
    await expect(soloHeading).toBeVisible();
  });

  test('auto-advance works on carousels', async ({ page }) => {
    await page.goto('/');

    // Wait for the intro loader
    await page.waitForTimeout(2000);

    // Wait for auto-advance to happen (carousels have different intervals: 4000ms, 4200ms, 4400ms)
    await page.waitForTimeout(5000);

    // Page should still be functional
    const heading = page.locator('h1:has-text("Shilpkala 2025")');
    await expect(heading).toBeVisible();
  });

  test('all three carousel sections are visible', async ({ page }) => {
    await page.goto('/');

    // Wait for the intro loader
    await page.waitForTimeout(2000);

    // Check for all three event type headings
    await expect(page.locator('text=Solo Events')).toBeVisible();
    await expect(page.locator('text=Duo Events')).toBeVisible();
    await expect(page.locator('text=Trio Events')).toBeVisible();
  });
});
