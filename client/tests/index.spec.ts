import { expect, test } from '@playwright/test';

test.describe('e2e', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('page navigates to home', async ({ page }) => {
		await page.getByRole('link', { name: 'Home' }).click();
		expect(
			page.getByRole('heading', { name: 'Optometry Resources' })
		).toBeVisible();
	});

	test('page navigates to calculators', async ({ page }) => {
		await page.getByRole('link', { name: 'Calculators' }).click();
		expect(page.getByRole('heading', { name: 'Calculators' })).toBeVisible();
	});

	test('page navigates to practitioners', async ({ page }) => {
		await page.getByRole('link', { name: 'Practitioners' }).click();
		expect(page.getByRole('heading', { name: 'Practitioners' })).toBeVisible();
	});

	test('page navigates to clinics', async ({ page }) => {
		await page.getByRole('link', { name: 'Clinics' }).click();
		expect(page.getByRole('heading', { name: 'Clinics' })).toBeVisible();
	});
});
