import { test as base } from "./base.js";

export const test = base.extend({
  // Fixture for logged-in user on a protected page
  authUser: async ({ loginPage, newPostPage }, use) => {
    await loginPage.login("TasevNikolay", "Password123!", false);

    await loginPage.toastMessage.waitFor({ state: "visible", timeout: 10000 });

    await newPostPage.goto();

    await use(newPostPage);
  },
});

export { expect } from "@playwright/test";
