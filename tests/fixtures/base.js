import { test as base } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { LoginPage } from "../../pages/LoginPage";
import { ProfilePage } from "../../pages/ProfilePage";
import { NewPostPage } from "../../pages/NewPostPage";
import { RegistrationPage } from "../../pages/RegistrationPage";

// Extend the base test to include page objects for easier access in tests
export const test = base.extend({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  newPostPage: async ({ page }, use) => {
    const newPostPage = new NewPostPage(page);
    await use(newPostPage);
  },

  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await use(registrationPage);
  },
});

export const expect = base.expect;
