import { test, expect } from '@playwright/test';

test('Login page UI should remain visually locked', async ({ page }) => {
    // 1. Navigate to the page you want to lock down
    await page.goto('http://127.0.0.1:3000/login');

    // 2. Wait for animations (like Framer Motion) to finish settling
    await page.waitForLoadState('networkidle');

    // 3. Take a snapshot and compare it to the baseline
    await expect(page).toHaveScreenshot('login-page-baseline.png', {
        maxDiffPixels: 100, // Allows for tiny, invisible rendering shifts
    });
});
