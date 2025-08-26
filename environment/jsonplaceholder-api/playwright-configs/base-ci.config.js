// @ts-check
import { defineConfig } from '@playwright/test'
import path from 'path'

export default defineConfig({
  fullyParallel: true,
  forbidOnly: true,
  retries: 1,
  // NOTE: number of workers is defined due to the research of our agent, see links below:
  // https://playwright.dev/docs/test-parallel
  // https://playwrightsolutions.com/whats-an-easy-way-to-tell-how-many-workers/
  workers: 4,
  // maxFailures: Number(process.env.PW_MAX_FAILURES) || 40,
  // timeout: 100 * 1000,
  // expect: {
  //   timeout: 100 * 1000
  // },

  reporter: [
    ['line'],
    ['html', { open: 'never', outputFolder: path.resolve(process.cwd(), 'playwright-report/jsonplaceholder-api/html/ci') }],
    ['junit', { outputFile: path.resolve(process.cwd(), 'playwright-report/jsonplaceholder-api/junit/ci.xml') }],
    ['json', { outputFile: path.resolve(process.cwd(), 'playwright-report/jsonplaceholder-api/json/ci.json') }],
    ['allure-playwright', { resultsDir: path.resolve(process.cwd(), 'allure-results'), absolutePaths: false }]
  ],

  use: {
    baseURL: 'https://jsonplaceholder.typicode.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  projects: [{ name: 'jsonplaceholder-api', testDir: path.resolve(process.cwd(), 'tests/jsonplaceholder-api'), testMatch: '**/*.spec.js' }]
})
