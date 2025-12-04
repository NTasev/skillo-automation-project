import { test as base, expect } from "./base.js";

// Authenticated user fixture

// Logs in a user before running tests that require authentication and provides the newPostPage for test use.
export const test = base.extend({
  authUser: async ({ page, newPostPage }, use) => {
    await page.goto("/users/login");

    await page
      .locator("#defaultLoginFormUsername")
      .fill(process.env.TEST_USER_CREDENTIAL_AUTHUSER); // username from .env
    await page
      .locator("#defaultLoginFormPassword")
      .fill(process.env.TEST_USER_PASSWORD_AUTHUSER); // password from .env

    await page.locator("#sign-in-button").click();

    await expect(page.locator("#toast-container")).toContainText(
      "Successful login!"
    );

    await page.waitForURL("/posts/all");

    // Navigate to new post page for tests that require it
    await newPostPage.goto();

    // Provide the newPostPage to the tests
    await use(newPostPage);
  },
});

export { expect } from "@playwright/test";
