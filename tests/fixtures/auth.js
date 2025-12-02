import { test as base } from "./base.js";
import { LoginPage } from "../../pages/LoginPage.js";

export const test = base.extend({
  // Fixture for logged-in user
  authUser: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login("TasevNikolay", "Password123!", false);

    // Wait for toast to ensure login completed
    await loginPage.toastMessage.waitFor({ state: "visible", timeout: 10000 });

    await use(page); // pass logged-in page to tests
  },
});

export { expect } from "@playwright/test";
