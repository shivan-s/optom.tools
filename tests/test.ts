import { expect, test } from '@playwright/test';

test.describe('snapshots', () => {
	test('home page', async ({ page }) => {
		await page.goto('/');
		await page.screenshot({ path: 'home.png', fullPage: true });
		await expect(page).toHaveScreenshot('home.png');
	});
});
