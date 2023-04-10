import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(
		page.getByRole('heading', { name: 'Optometry Resources' })
	).toBeVisible();
});

test('home button works', async ({ page, baseURL }) => {
	await page.goto('/');
	await page.getByRole('link', { name: 'Optometry Resources' }).click();
	expect(page.url()).toBe(baseURL);
});
