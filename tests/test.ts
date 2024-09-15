import { expect, test } from '@playwright/test';

test.describe('Test suite', () => {
	const links = [
		{ name: 'home', link: '/' },
		{ name: 'back-vertex-power', link: '/back-vertex-power' },
		{ name: 'cylindrical-transposition', link: '/cylindrical-transposition' },
		{ name: 'minimum-blank-size', link: '/minimum-blank-size' }
	];
	links.forEach(({ name, link }) => {
		test(`${link} page`, async ({ page }) => {
			await page.goto(link);
			await expect(page).toHaveScreenshot(`${name}.png`);
		});
	});
	test('404 page', async ({ page }) => {
		test.fail();
		await page.goto('/notfound');
		await expect(page).toHaveScreenshot('404-error.png');
	});
});
