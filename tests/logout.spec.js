import { test, expect } from "./fixtures/base.js";

test("✅TC01: Logout should pass with valid login and redirects to login page", async ({
  loginPage,
  homePage,
}) => {
  await loginPage.goto();

  await loginPage.login("NikolayTasev", "Password123!");

  // Verify successful login
  await expect(loginPage.toastMessage).toHaveText("Successful login!");

  // Ensure home page is loaded
  await homePage.isLoaded();

  // Perform logout
  await homePage.logout();

  // Assertions
  await expect(loginPage.toastMessage).toContainText("Successful logout!");
});
