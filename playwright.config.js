import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // -----------------------------
  // Test folder structure
  // -----------------------------
  testDir: "./tests",
  outputDir: "test-artifacts", // Centralized storage for videos, traces, screenshots

  // -----------------------------
  // Parallelization & retries
  // -----------------------------
  fullyParallel: true,
  workers: 3, // Fixed to 3 workers
  retries: process.env.CI ? 2 : 0, // Retry only in CI for stability

  // -----------------------------
  // Global timeouts
  // -----------------------------
  timeout: 30_000,

  // -----------------------------
  // Debugging & artifacts
  // -----------------------------
  use: {
    baseURL: process.env.BASE_URL || "http://training.skillo-bg.com:4300/",
    trace: "on-first-retry", // Traces only when needed
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 0,
    navigationTimeout: 0,

    // Use stable Chromium for reliability
    browserName: "chromium",
  },

  // -----------------------------
  // Reporting
  // -----------------------------
  reporter: process.env.CI
    ? [["html"], ["github"], ["json", { outputFile: "test-results.json" }]]
    : [["html", { open: "never" }], ["list"]],

  // -----------------------------
  // Browser & device coverage
  // -----------------------------
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"], firefoxUserPrefs: {} }, // stable prefs
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
