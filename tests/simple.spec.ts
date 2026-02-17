import { test, expect } from '@playwright/test';

test('Google should be reachable', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle(/Google/);
});
