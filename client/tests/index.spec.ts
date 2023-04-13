import { expect, test } from '@playwright/test';

test.describe('e2e', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page navigation', async ({ page }) => {
		await page.getByRole('link', { name: 'Home' }).click();
		expect(
			page.getByRole('heading', { name: 'Optometry Resources' })
		).toBeVisible();
		await page.getByRole('link', { name: 'Calculators' }).click();
		expect(page.getByRole('heading', { name: 'Calculators' })).toBeVisible();
		await page.getByRole('link', { name: 'Practitioners' }).click();
		expect(page.getByRole('heading', { name: 'Practitioners' })).toBeVisible();
		await page.getByRole('link', { name: 'Clinics' }).click();
		expect(page.getByRole('heading', { name: 'Clinics' })).toBeVisible();
	});
});
