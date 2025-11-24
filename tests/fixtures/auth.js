import { test as base } from "./base.js";
import LoginPage from "../../pages/LoginPage.js";
import testData from "../../test-data/users.json";

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password
    );
    await use(page);
  },
});

export { expect } from "@playwright/test";
