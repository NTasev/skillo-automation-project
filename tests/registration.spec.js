import { test, expect } from "./fixtures/base.js";
import { generateUsername, generateEmail } from "../utils/helpers.js";
import { invalidData } from "../test-data/registrationData.js";

test.beforeEach(async ({ registrationPage }) => {
  // Navigate to the page first
  await registrationPage.goto();
});

// ---------------------------
// Positive test case
// ---------------------------

test("✅TC01.Positive: Should register with valid user credentials", async ({
  registrationPage,
  homePage,
}) => {
  const randomUsername = generateUsername();
  const randomEmail = generateEmail();

  await expect(registrationPage.signUpHeader).toHaveText("Sign up");

  await registrationPage.registration({
    username: randomUsername,
    email: randomEmail,
    date: "2000-01-01",
    password: "Password123!",
    confirmPassword: "Password123!",
    info: "Automation QA Test",
  });

  await expect(registrationPage.toastContainer).toBeVisible();
  await expect(registrationPage.toastContainer).toHaveText(
    "Successful register!"
  );

  await homePage.isLoaded();
  await expect(homePage.linkProfile).toBeVisible();
});

// ---------------------------
// Negative test cases
// ---------------------------
test("❌TC02.Negative: Registration fails with weak password", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername(invalidData[0].username);
  await registrationPage.fillEmail(invalidData[0].email);
  await registrationPage.fillBirthDate(invalidData[0].date);
  await registrationPage.fillPassword(invalidData[0].password);
  await registrationPage.fillConfirmPassword(invalidData[0].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[0].info);

  const clicked = await registrationPage.submitIfEnabled();
  await expect(clicked).toBe(false);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[0].expectedFeedback
  );
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");
});

test("❌TC03.Negative: Registration fails when passwords do not match", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername(invalidData[1].username);
  await registrationPage.fillEmail(invalidData[1].email);
  await registrationPage.fillBirthDate(invalidData[1].date);
  await registrationPage.fillPassword(invalidData[1].password);
  await registrationPage.fillConfirmPassword(invalidData[1].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[1].info);

  const clicked = await registrationPage.submitIfEnabled();
  await expect(clicked).toBe(false);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[1].expectedFeedback
  );
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");
});

test("❌TC04.Negative: Registration fails with missing username", async ({
  registrationPage,
}) => {
  await registrationPage.fillUsername(invalidData[2].username);
  await registrationPage.fillEmail(invalidData[2].email);
  await registrationPage.fillBirthDate(invalidData[2].date);
  await registrationPage.fillPassword(invalidData[2].password);
  await registrationPage.fillConfirmPassword(invalidData[2].confirmPassword);
  await registrationPage.fillPublicInfo(invalidData[2].info);

  const clicked = await registrationPage.submitIfEnabled();
  await expect(clicked).toBe(false);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    invalidData[2].expectedFeedback
  );
  await expect(registrationPage.signUpHeader).toHaveText("Sign up");
});
