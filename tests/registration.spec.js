import { test, expect } from "./fixtures/base.js";
import { generateUsername, generateEmail } from "../utils/helpers.js";

test.beforeEach(async ({ registrationPage }) => {
  await registrationPage.goto();
});

// ---------------------------
// Positive test case
// ---------------------------

test("Positive: Should register with valid credentials", async ({
  registrationPage,
  homePage,
}) => {
  const randomUsername = generateUsername();
  const randomEmail = generateEmail();

  await registrationPage.fillUsername(randomUsername);
  await registrationPage.fillEmail(randomEmail);
  await registrationPage.fillBirthDate("2000-01-01");
  await registrationPage.fillPassword("Password123!");
  await registrationPage.fillConfirmPassword("Password123!");
  await registrationPage.fillPublicInfo("Automation QA Test");

  await registrationPage.signIn();

  await registrationPage.waitForSuccessMessage();
  await expect(registrationPage.successMessage).toHaveText(
    "Successful register!"
  );

  await homePage.isLoaded();
});

// ---------------------------
// Negative test cases
// ---------------------------

test("Negative: Should fail with weak or invalid password", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername("testUser");
  await registrationPage.fillEmail("test@example.com");
  await registrationPage.fillBirthDate("2000-01-01");
  await registrationPage.fillPassword("password"); // invalid
  await registrationPage.fillConfirmPassword("password");
  await registrationPage.fillPublicInfo("My passwort is too weak");

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "Must contain digit and uppercase letter!"
  );
});

test("Negative: Should appear feedback for invalid password", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername("testUser");
  await registrationPage.fillEmail("test@example.com");
  await registrationPage.fillBirthDate("2000-01-01");
  await registrationPage.fillPassword("Password123!"); // Valid password
  await registrationPage.fillConfirmPassword("password123"); // Invalid: password123
  await registrationPage.fillPublicInfo("My passwords do not match");

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "Passwords do not match!"
  );
});

test("Negative: Should fail because of missing username", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername("");
  await registrationPage.fillEmail("test@example.com");
  await registrationPage.fillBirthDate("2000-01-01");
  await registrationPage.fillPassword("Password123!");
  await registrationPage.fillConfirmPassword("Password123!");
  await registrationPage.fillPublicInfo("My username is missing");

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "This field is required!"
  );
});
