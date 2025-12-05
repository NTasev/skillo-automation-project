import { test, expect } from "./fixtures/base.js";
import testData from "../test-data/users.json" assert { type: "json" };

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.isLoaded();
});

// Positive test cases - Successful Logins

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

    // Verify navigation t0 h0me page and then to profile page
    await homePage.isLoaded();

    // Navigate to profile page and verify correct username is displayed
    await homePage.goToProfile();
    await profilePage.isLoaded();

    await expect(profilePage.profileHeader).toHaveText(user.expectedUsername);
  });
});

// Negative tests cases - Empty Data

// Test name uses specific empty credentials from users.json
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

// Negative test cases - Unregistered Data

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

// Clear cookies and storage after each test to maintain isolation after remember me checkbox //
test.afterEach(async ({ page }) => {
  const context = page.context();
  await context.clearCookies();
  await page.evaluate(() => localStorage.clear());
  await page.evaluate(() => sessionStorage.clear());
});
