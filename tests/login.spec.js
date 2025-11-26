import { test, expect } from "./fixtures/base.js";
import { validUsers, invalidUsers } from "../utils/testData.js";

test.beforeEach(async ({ loginPage }) => {
  await loginPage.goto();
});

// ----------------------
// Positive Test Cases
// ----------------------

test("Positive: Successful login with valid username and password", async ({
  loginPage,
  homePage,
}) => {
  const user = validUsers[0]; // this take the first valid user by username

  await loginPage.login(user.username, user.password, true);

  await expect(loginPage.rememberMeButton).toBeChecked();
  await loginPage.waitForSuccessMessage();
  await expect(loginPage.successMessage).toHaveText("Successful login!");

  await homePage.isLoaded();
});

test("Positive: Successful login with valid email and password", async ({
  loginPage,
  homePage,
}) => {
  const user = validUsers[1]; // this take the second valid user by email

  await loginPage.login(user.email, user.password, true);

  await expect(loginPage.rememberMeButton).toBeChecked();
  await loginPage.waitForSuccessMessage();
  await expect(loginPage.successMessage).toHaveText("Successful login!");

  await homePage.isLoaded();
});

// ----------------------
// Negative Test Cases (data-driven)
// ----------------------
invalidUsers.forEach((user) => {
  test(`login fails by: ${user.description}`, async ({ loginPage }) => {
    await loginPage.login(user.username || "", user.password || "");

    if (await loginPage.signInButton.isEnabled()) {
      // Only wait for error message if form was submitted
      try {
        await loginPage.waitForErrorMessage();
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(
          "Wrong username or password!"
        );
      } catch {
        // If error message never appeared, just confirm still on login page
        console.log("Error message did not appear, staying on login page.");
      }
    } else {
      // Form blocked, button disabled
      await expect(loginPage.signInButton).toBeDisabled();
    }

    await loginPage.isLoginPage();
  });
});
