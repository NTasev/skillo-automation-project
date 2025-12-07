import { test, expect } from "./fixtures/base.js";
import { generateUsername, generateEmail } from "../utils/helpers.js";
import { invalidData } from "../test-data/registrationData.js";

// Positive test case - Successful Registration //

test.beforeEach(async ({ registrationPage }) => {
  await registrationPage.goto();
  await registrationPage.isLoaded();
});

test("✅TC01: Should register with valid user credentials", async ({
  registrationPage,
  homePage,
  profilePage,
}) => {
  // Generate random valid data for registration
  const randomUsername = generateUsername();
  const randomEmail = generateEmail();

  await expect(registrationPage.signUpHeader).toHaveText("Sign up");

  // Fill registration form and submit after successful validation from POM
  await registrationPage.registration({
    username: randomUsername,
    email: randomEmail,
    date: "2000-01-01",
    password: "Password123!",
    confirmPassword: "Password123!",
    info: "Automation QA Test",
  });

  await expect(registrationPage.toastMessage).toContainText(
    "Successful register!"
  );

  // Verify navigation to home page and then to profile page
  await homePage.isLoaded();
  await expect(homePage.linkProfile).toHaveText("Profile");
  await expect(homePage.linkNewPost).toHaveText("New post");

  await homePage.goToProfile();

  // Verify profile page is loaded and username matches expected
  await profilePage.isLoaded();
  await expect(profilePage.profileHeader).toHaveText(randomUsername);
});

// Negative test cases - invalid data //

test("❌TC02: Registration should fails with weak password", async ({
  registrationPage,
}) => {
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");

  // Fill form with invalid data from registrationData.js using first set
  await registrationPage.fillUsername(invalidData[0].username);
  await registrationPage.fillEmail(invalidData[0].email);
  await registrationPage.fillBirthDate(invalidData[0].date);
  await registrationPage.fillPassword(invalidData[0].password);
  await registrationPage.fillConfirmPassword(invalidData[0].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[0].info);

  await expect(registrationPage.signInButton).toBeDisabled();

  // Verify error feedback while taking it from registrationData.js
  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[0].expectedFeedback
  );
});

test("❌TC03: Registration should fails when passwords do not match", async ({
  registrationPage,
}) => {
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");

  // Fill form with invalid data from registrationData.js using second set
  await registrationPage.fillUsername(invalidData[1].username);
  await registrationPage.fillEmail(invalidData[1].email);
  await registrationPage.fillBirthDate(invalidData[1].date);
  await registrationPage.fillPassword(invalidData[1].password);
  await registrationPage.fillConfirmPassword(invalidData[1].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[1].info);

  await expect(registrationPage.signInButton).toBeDisabled();

  // Verify error feedback while taking it from registrationData.js
  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[1].expectedFeedback
  );
});

test("❌TC04: Registration should fails with missing username", async ({
  registrationPage,
}) => {
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");

  // Fill form with invalid data from registrationData.js using third set
  await registrationPage.fillUsername(invalidData[2].username);
  await registrationPage.fillEmail(invalidData[2].email);
  await registrationPage.fillBirthDate(invalidData[2].date);
  await registrationPage.fillPassword(invalidData[2].password);
  await registrationPage.fillConfirmPassword(invalidData[2].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[2].info);

  await expect(registrationPage.signInButton).toBeDisabled();

  // Verify error feedback while taking it from registrationData.js
  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[2].expectedFeedback
  );
});
