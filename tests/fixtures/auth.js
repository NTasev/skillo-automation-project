import { test as base, expect } from "./base.js";

export const test = base.extend({
  authUser: async ({ page, newPostPage }, use) => {
    // 1) Open Login page
    await page.goto("/users/login");

    // 2) Fill in credentials
    await page.locator("#defaultLoginFormUsername").fill("TasevNikolay");
    await page.locator("#defaultLoginFormPassword").fill("Password123!");

    // 3) Click Login
    await page.locator("#sign-in-button").click();

    // 4) Verify successful login toast
    await expect(page.locator("#toast-container")).toContainText(
      "Successful login!"
    );

    // 5) Wait for redirect after login
    await page.waitForURL("/posts/all");

    // 6) Go to New Post page
    await newPostPage.goto();

    // 7) Provide logged-in NewPostPage to tests
    await use(newPostPage);
  },
});

export { expect } from "@playwright/test";
