import { test as base } from "./base.js";
import { LoginPage } from "../../pages/LoginPage.js";

export const test = base.extend({
  // Override page so all tests start logged in
  authUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    // Perform login
    await loginPage.goto(); // make sure you navigate to login page first
    await loginPage.login("TasevNikolay", "Password123!");

    // Wait for toast to appear
    await page.waitForSelector("#toast-container");

    // Pass the logged-in page to the test
    await use(page);

    // Cleanup
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  },
});

export { expect } from "@playwright/test";
