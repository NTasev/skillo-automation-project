import { test as base } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage.js";
import { HomePage } from "../../pages/HomePage.js";
import { RegistrationPage } from "../../pages/RegistrationPage.js";
import { NewPostPage } from "../../pages/NewPostPage.js";
import { ProfilePage } from "../../pages/ProfilePage.js";

// Extend base test with custom fixtures
export const test = base.extend({
  // Page Object fixtures - auto-instantiate page objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  newPostPage: async ({ page }, use) => {
    await use(new NewPostPage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
});

export { expect } from "@playwright/test";
