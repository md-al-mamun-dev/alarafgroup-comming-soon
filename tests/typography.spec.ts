import { test, expect } from '@playwright/test';

test.describe('Bengali Typography & Layout', () => {
  test('Root route renders Bengali with correct fonts and screenshots', async ({ page }) => {
    // Navigate to root
    await page.goto('http://localhost:3000/');

    // Check html lang
    await expect(page.locator('html')).toHaveAttribute('lang', 'bn');

    // Check Hero H1 font
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // The text should contain the Bengali title
    await expect(h1).toContainText('বিশ্বাসের ভিত্তিতে');

    // Assert computed font family contains Noto Serif Bengali
    const fontFamily = await h1.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('Noto Serif Bengali');

    // Take screenshot of the hero section for visual regression
    await page.screenshot({ path: 'tests/screenshots/hero-bn.png' });
  });

  test('/en route renders English with correct fonts and screenshots', async ({ page }) => {
    // Navigate to english
    await page.goto('http://localhost:3000/en');

    // Check html lang
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Check Hero H1 font
    const h1 = page.locator('h1').first();
    await expect(h1).toContainText('Built on Trust');

    // Assert computed font family contains Manrope
    const fontFamily = await h1.evaluate((el) => window.getComputedStyle(el).fontFamily);
    expect(fontFamily).toContain('Manrope');

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/hero-en.png' });
  });
});
