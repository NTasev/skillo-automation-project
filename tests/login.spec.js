import { test, expect } from "./fixtures/base.js";
import testData from "../test-data/users.json" assert { type: "json" };

// This test.beforeEach hook will run before every single 'test' in this file,
test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto("/users/login");
});

// ------------------------------------
// POSITIVE TEST CASES
// ------------------------------------

// The forEach loop dynamically creates individual, independent 'test' cases.
testData.validCases.forEach((user) => {
  test(`✅ ${user.id}: Login should pass with ${user.description}`, async ({
    loginPage,
    homePage,
    profilePage,
  }) => {
    // Uses the username from the single object + success message assertion
    await loginPage.login(user.credential, user.password, true);

    // Assert successful login toast message
    await expect(loginPage.toastMessage).toContainText("Successful login!");

    // Navigate to profile and assert username
    await homePage.goToProfile();
    await expect(profilePage.profileHeader).toHaveText(user.expectedUsername);
  });
});

// ------------------------------------
// NEGATIVE TEST CASES - Empty Data
// ------------------------------------

// Test name uses specific empty credentials
testData.emptyCases.forEach((user) => {
  test(`❌ ${user.id}: Login should fail with ${user.description}`, async ({
    loginPage,
  }) => {
    // Attempt to login with empty fields
    await loginPage.fillUsername(user.username);
    await loginPage.fillPassword(user.password);

    // Assert that the submit button cannot be clicked
    const clicked = await loginPage.submitIfEnabled();
    await expect(clicked).toBe(false);
  });
});

// ------------------------------------
// NEGATIVE TEST CASES - Invalid Data
// ------------------------------------

// Test name uses specific wrong credentials
testData.invalidCases.forEach((user) => {
  test(`❌${user.id}: Login should fail with ${user.description}`, async ({
    loginPage,
  }) => {
    await loginPage.login(user.username, user.password, false);

    // Assertions for wrong credentials toast message
    await expect(loginPage.toastMessage).toContainText(
      "Wrong username or password!"
    );
  });
});
