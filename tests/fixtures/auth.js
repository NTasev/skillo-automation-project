import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.goto();
    // replace with real credentials or data from test-data/users.json
    await login.login("existingUser", "Password123!");
    // wait for URL or toast to ensure logged in
    await page.waitForURL("**/posts/all");
    await use(page);
  },
});

export { expect } from "@playwright/test";
