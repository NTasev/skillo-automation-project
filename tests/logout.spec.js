import { test, expect } from "./fixtures/base.js";

// Positive test case - Logout with valid login //

test("✅TC01: Logout should redirects logged-in user to login page", async ({
  loginPage,
  homePage,
}) => {
  // Login first to be able to logout
  await loginPage.goto();
  await loginPage.isLoaded();
  await expect(loginPage.signInHeader).toHaveText("Sign in");

  // Login with valid credentials (hardcoded in .env file)
  await loginPage.login(
    process.env.TEST_USER_CREDENTIAL_LOGOUT,
    process.env.TEST_USER_CREDENTIAL_LOGOUT_PASSWORD
  );
  await expect(loginPage.toastMessage).toHaveText("Successful login!");

  // Verify home page is loaded
  await homePage.isLoaded();
  await homePage.logout();

  // Verify redirection to login page after logout
  await loginPage.isLoaded();
  await loginPage.waitForLogoutToastMessage();
  await expect(loginPage.toastMessage).toContainText("Successful logout!");
});
