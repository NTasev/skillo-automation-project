import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: {
    timeout: 5000, // max time for expect assertions
  },
  retries: 1, // retries for failing tests
  reporter: [
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["list"],
  ],
  use: {
    baseURL: "http://training.skillo-bg.com:4300", // enables relative navigation
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on", // record videos of all tests
    screenshot: "only-on-failure", // screenshots on failure
    trace: "retain-on-failure", // collect trace for debugging
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  workers: 1, // parallel execution
  forbidOnly: !!process.env.CI, // CI safety
});
