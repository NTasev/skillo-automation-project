import { test, expect } from "./fixtures/base.js";

test("Positive: Successful registration", async ({
  registrationPage,
  testUser,
}) => {
  await registrationPage.fillUsername(testUser.username);
  await registrationPage.fillEmail(testUser.email);
  await registrationPage.fillBirthDate(testUser.birthData);
  await registrationPage.fillPassword(testUser.password);
  await registrationPage.fillConfirmPassword(testUser.password);
  await registrationPage.fillPublicInfo(testUser.publicInfo);

  await registrationPage.signIn();

  await registrationPage.waitForSuccessMessage();
  await expect(registrationPage.successMessage).toHaveText(
    "Successful register!"
  );
});

test("Negative: Weak or Invalid Password", async ({
  registrationPage,
  invalidUser,
}) => {
  await registrationPage.fillUsername(invalidUser.username);
  await registrationPage.fillEmail(invalidUser.email);
  await registrationPage.fillBirthDate(invalidUser.birthData);
  await registrationPage.fillPassword(invalidUser.password); // invalid: no uppercase
  await registrationPage.fillConfirmPassword(invalidUser.password); // using the same weak password
  await registrationPage.fillPublicInfo(invalidUser.publicInfo);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "Must contain digit and uppercase letter!"
  );
});

test("Negative: Password Do Not Match", async ({
  registrationPage,
  invalidUser,
}) => {
  await registrationPage.fillUsername(invalidUser.username);
  await registrationPage.fillEmail(invalidUser.email);
  await registrationPage.fillBirthDate(invalidUser.birthData);
  await registrationPage.fillPassword("Password123!"); // Valid password
  await registrationPage.fillConfirmPassword(invalidUser.password); // Invalid: password123
  await registrationPage.fillPublicInfo(invalidUser.publicInfo);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "Passwords do not match!"
  );
});

test("Negative: Missing username", async ({ registrationPage, testUser }) => {
  await registrationPage.fillUsername("");
  await registrationPage.fillEmail(testUser.email);
  await registrationPage.fillBirthDate(testUser.birthData);
  await registrationPage.fillPassword(testUser.password);
  await registrationPage.fillConfirmPassword(testUser.password);
  await registrationPage.fillPublicInfo(testUser.publicInfo);

  await expect(registrationPage.invalidFeedback).toBeVisible();
  await expect(registrationPage.invalidFeedback).toHaveText(
    "This field is required!"
  );
});
