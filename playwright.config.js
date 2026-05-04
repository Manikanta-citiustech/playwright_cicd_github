//playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  workers: 1,
  fullyParallel: false,
  retries: 0,
  reporter: [
      ['list'], 
      ['html',{open:process.env.CI ? 'never':'always'}], 
      ['allure-playwright']],
 //reporter: [['html', { open: 'never', outputFolder: 'playwright-report' }]],
 //reporter: [['json', { outputFile: 'results.json' }]],

  use: {
    baseURL: process.env.BASEURL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome']}}],
});




