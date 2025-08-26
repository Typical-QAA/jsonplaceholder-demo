// @ts-check
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never', outputFolder: './playwright-report/jsonplaceholder-api/html/local' }]],
  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',

    trace: 'on-first-retry',

    video: 'retain-on-failure'
  },

  projects: [{ name: 'jsonplaceholder-api', testDir: 'tests/jsonplaceholder-api', testMatch: '**/*.spec.js' }]
})
