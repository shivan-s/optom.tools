import { expect, test } from '@playwright/test';

test.describe('e2e', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page navigation', async ({ page }) => {
		await page.getByRole('link', { name: 'Home' }).click();
		await expect(
			page.getByRole('heading', { name: 'Optometry Resources' })
		).toBeVisible();

		const NAV_LINKS = ['Calculators', 'Practitioners', 'Clinics'];

		NAV_LINKS.map(async (link: string) => {
			await page.getByRole('link', { name: link }).click();
			await expect(page.getByRole('heading', { name: link })).toBeVisible();
		});
	});
});
