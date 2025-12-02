import { test, expect } from "./fixtures/base.js";
import testData from "../test-data/users.json" assert { type: "json" };

// --- HOOKS: Ensure Test Independence ---
test.beforeEach(async ({ page, loginPage }) => {
  // 1. Clears any authentication/session state from the previous test run
  await page.context().clearCookies();

  // 2. Navigates to a clean starting point using POM
  await loginPage.goto();
});

// ------------------------------------
// POSITIVE TEST CASES
// ------------------------------------

test.describe("Positive Login Tests", () => {
  testData.validCases.forEach((user) => {
    // Test name uses specific credential type (username/email)
    test(`✅ ${user.id}: Login should pass with ${user.description}`, async ({
      loginPage,
      homePage,
      profilePage,
    }) => {
      // Uses the username from the single object + success message assertion
      await loginPage.login(user.credential, user.password, true);
      await expect(loginPage.toastMessage).toContainText("Successful login!");

      // Navigate to profile and assert username
      await homePage.goToProfile();
      await expect(profilePage.profileHeader).toHaveText(user.expectedUsername);
    });
  });
});

// ------------------------------------
// NEGATIVE TEST CASES
// ------------------------------------

test.describe("Negative Tests: Empty/Required Fields", () => {
  testData.emptyCases.forEach((user) => {
    // Test name uses specific empty credentials
    test(`❌ ${user.id}: Login should fail with ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.fillUsername(user.username);
      await loginPage.fillPassword(user.password);

      // Assert that the submit button cannot be clicked
      const clicked = await loginPage.submitIfEnabled();
      await expect(clicked).toBe(false);
    });
  });
});

test.describe("Negative Tests: Wrong Credentials", () => {
  testData.invalidCases.forEach((user) => {
    // Test name uses specific wrong credentials
    test(`❌${user.id}: Login should fail with ${user.description}`, async ({
      loginPage,
    }) => {
      await loginPage.login(user.username, user.password, false);

      // Assertions
      await expect(loginPage.toastMessage).toBeVisible();
      await expect(loginPage.toastMessage).toHaveText(
        "Wrong username or password!"
      );
    });
  });
});
