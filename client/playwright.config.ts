import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: !process.env.CI
	},
	testDir: 'tests',
	use: {
		baseURL: 'http://localhost:4173/',
		trace: 'on-first-retry'
	},
	expect: { timeout: 100000 }
};

export default config;
