import { expect, test } from '@playwright/test';

test.describe('snapshots', () => {
	test('home page', async ({ page }) => {
		await page.goto('/');
		await expect(page).toHaveScreenshot('home.png');
	});
});
