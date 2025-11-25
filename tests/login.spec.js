import { test, expect } from "./fixtures/base.js";
import { validUsers, invalidUsers } from "../test-data/users.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

test.describe("Login - positive cases", () => {
  validUsers.forEach((user) => {
    test(`login successfully with ${user.username} | ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.login(user.username, user.password);
      await loginPage.waitForSuccessMessage();
      await expect(loginPage.successMessage).toBeVisible();
    });
  });
});

test.describe("Login - negative cases", () => {
  invalidUsers.forEach((user) => {
    test(`login fails with ${user.username} | ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.login(user.username, user.password);
      await loginPage.waitForInvalidFeedback();
      await expect(loginPage.invalidFeedback.first()).toBeVisible();
    });
  });
});
