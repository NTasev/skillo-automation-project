import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../../pages/LoginPage.js";
import { RegistrationPage } from "../../pages/RegistrationPage.js";
import { HomePage } from "../../pages/HomePage.js";
import { ProfilePage } from "../../pages/ProfilePage.js";
import { NewPostPage } from "../../pages/NewPostPage.js";

// --- Helper functions for generating random data ---
function generateRandomUsername() {
  return `user${Math.floor(Math.random() * 100000)}`;
}

function generateRandomEmail() {
  return `user${Math.floor(Math.random() * 100000)}@test.com`;
}

// --- Combined fixtures ---
export const test = base.extend({
  // Page objects
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await use(registrationPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  profilePage: async ({ page }, use) => {
    const profilePage = new ProfilePage(page);
    await use(profilePage);
  },

  newPostPage: async ({ page }, use) => {
    const newPostPage = new NewPostPage(page);
    await newPostPage.goto();
    await use(newPostPage);
  },

  // Test users
  // eslint-disable-next-line no-empty-pattern
  testUser: async ({}, use) => {
    const user = {
      username: generateRandomUsername(),
      email: generateRandomEmail(),
      password: "Password123!",
      birthData: "2000-01-01", // fixed for positive tests
      publicInfo: "Automation QA Test", // fixed for positive tests
    };
    await use(user);
  },

  // eslint-disable-next-line no-empty-pattern
  invalidUser: async ({}, use) => {
    const user = {
      username: "WeakUser",
      email: "weak@example.com",
      password: "password123", // weak password
      birthData: "1999-12-30", // fixed
      publicInfo: "Invalid user test", // fixed
    };
    await use(user);
  },
});

export { expect };
