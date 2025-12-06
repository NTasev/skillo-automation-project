import { test, expect } from "./fixtures/base.js";
import testData from "../test-data/users.json" assert { type: "json" };

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.isLoaded();
});

// Positive test cases - Successful Logins //

// The forEach loop dynamically creates individual, independent 'test' cases.
testData.validCases.forEach((user) => {
  test(`✅ ${user.id}: Login should pass with ${user.description}`, async ({
    loginPage,
    homePage,
    profilePage,
  }) => {
    const username = process.env[user.credentialKey];
    const password = process.env[user.passwordKey];

    await expect(loginPage.signInHeader).toHaveText("Sign in");

    // Uses the username from the single object + success message assertion
    await loginPage.login(username, password, true);
    await expect(loginPage.toastMessage).toContainText("Successful login!");

    // Verify navigation to home page and then to profile page
    await homePage.isLoaded();
    await homePage.goToProfile();

    // Navigate to profile page and verify correct username is displayed
    await profilePage.isLoaded();
    await expect(profilePage.profileHeader).toHaveText(user.expectedUsername);
  });
});

// Negative tests cases - Empty Data //

testData.emptyCases.forEach((user) => {
  test(`❌ ${user.id}: Login should fail with ${user.description}`, async ({
    loginPage,
  }) => {
    await expect(loginPage.signInHeader).toHaveText("Sign in");

    // Attempt to login with empty fields
    await loginPage.fillUsername(user.username);
    await loginPage.fillPassword(user.password);

    // Assert that the submit button cannot be clicked
    const clicked = await loginPage.submitIfEnabled();
    await expect(clicked).toBe(false);
  });
});

// Negative test cases - Unregistered Data //

testData.unregisteredCases.forEach((user) => {
  test(`❌${user.id}: Login should fail with ${user.description}`, async ({
    loginPage,
  }) => {
    await expect(loginPage.signInHeader).toHaveText("Sign in");

    await loginPage.login(user.username, user.password, false);

    await expect(loginPage.toastMessage).toContainText(
      "Wrong username or password!"
    );
  });
});
