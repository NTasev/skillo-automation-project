import { test, expect } from "./fixtures/base.js";
import {
  validUsers,
  emptyFieldUsers,
  unregisteredUsers,
} from "../test-data/loginData.js";

test.beforeEach(async ({ page, loginPage }) => {
  // Clear cookies first
  await page.context().clearCookies();

  // Navigate to login page
  await loginPage.goto();

  // Prevent Firefox SecurityError
  await page.waitForLoadState("domcontentloaded");

  // Clear localStorage and sessionStorage if needed
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
});

// ----------------------
// Positive Test Cases
// ----------------------

test("✅TC01.Positive: Login should pass with valid username and password", async ({
  loginPage,
  homePage,
  profilePage,
}) => {
  const user = validUsers[0];

  await loginPage.login(user.username, user.password, true);

  await expect(loginPage.toastMessage).toBeVisible();
  await expect(loginPage.toastMessage).toContainText("Successful login!");

  await homePage.isLoaded();
  await homePage.goToProfile();

  await profilePage.isLoaded();
  await expect(profilePage.profileHeader).toBeVisible();
  await expect(profilePage.profileHeader).toHaveText(user.username);
});

test("✅TC02.Positive: Login should pass with valid email and password", async ({
  loginPage,
  homePage,
  profilePage,
}) => {
  const user = validUsers[1];

  await loginPage.login(user.email, user.password, true);

  await expect(loginPage.toastMessage).toBeVisible();
  await expect(loginPage.toastMessage).toContainText("Successful login!");

  await homePage.isLoaded();
  await homePage.goToProfile();

  await profilePage.isLoaded();
  await expect(profilePage.profileHeader).toBeVisible();
  await expect(profilePage.profileHeader).toHaveText(user.username);
});

// ----------------------
// Negative Test Cases
// ----------------------

// Negative: Empty password
emptyFieldUsers
  .filter((user) => user.description === "empty password field")
  .forEach((user) => {
    test(`❌TC03.Negative: Login should fails with ${user.username}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.fillPassword(user.password);

      const clicked = await loginPage.submitIfEnabled();
      await expect(clicked).toBe(false);
    });
  });

// Negative: Empty username
emptyFieldUsers
  .filter((user) => user.description === "empty username field")
  .forEach((user) => {
    test(`❌TC04.Negative: Login should fails with ${user.username}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.fillPassword(user.password);

      const clicked = await loginPage.submitIfEnabled();
      await expect(clicked).toBe(false);
    });
  });

// Negative: Unregistered user
unregisteredUsers.forEach((user) => {
  test(`❌TC05.Negative: Login should fails with ${user.username}`, async ({
    loginPage,
  }) => {
    await loginPage.login(user.username, user.password, false);

    await expect(loginPage.toastMessage).toBeVisible();
    await expect(loginPage.toastMessage).toHaveText(
      "Wrong username or password!"
    );
  });
});
