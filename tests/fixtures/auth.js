// Assuming base.js already extends with newPostPage
import { test as base, expect } from "./base.js";

export const test = base.extend({
  // 1. Core Fixture: Handles Authentication and Cleanup
  authenticatedPage: async ({ page }, use) => {
    await page.goto("/users/login");

    await page
      .locator("#defaultLoginFormUsername")
      .fill(process.env.TEST_USER_CREDENTIAL_AUTHUSER);
    await page
      .locator("#defaultLoginFormPassword")
      .fill(process.env.TEST_USER_PASSWORD_AUTHUSER);

    await page.locator("#sign-in-button").click();

    await page.locator("#toast-container").waitFor({ state: "visible" });
    await expect(page.locator("#toast-container")).toContainText(
      "Successful login!"
    );

    await page.waitForURL("/posts/all");

    // Provide the authenticated page to the test
    await use(page);
  },

  // 2. Composed Fixture: Uses the authenticatedPage and navigates to the New Post page
  authUser: async ({ authenticatedPage, newPostPage }, use) => {
    // The 'authenticatedPage' setup phase (login) already ran.
    // We now have the authenticated browser context.
    await newPostPage.goto();
    await newPostPage.isLoaded();

    // Provide the required POM to the test
    await use(newPostPage);
  },
});

export { expect } from "@playwright/test";
