import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage.js";
import {
  generateValidUsername,
  generateValidEmail,
  generateRandomDate,
  generateRandomPublicInfo,
} from "./utils.js";

const username = generateValidUsername();
const email = generateValidEmail();
const date = generateRandomDate();
const info = generateRandomPublicInfo();

let registration;

test.beforeEach(async ({ page }) => {
  registration = new RegistrationPage(page);
  await registration.navigate();
});

test("Positive: Successful registration", async () => {
  await registration.fillUsername(username);
  await registration.fillEmail(email);
  await registration.fillBirthDate(date);
  await registration.fillPassword("Password123!");
  await registration.fillConfirmPassword("Password123!");
  await registration.fillPublicInfo(info);

  await registration.signIn();

  await registration.waitForSuccessMessage();
  await expect(registration.successMessage).toBeVisible();
  await expect(registration.successMessage).toHaveText("Successful register!");
});

test("Negative: Weak or Invalid Password", async () => {
  await registration.fillUsername(username);
  await registration.fillEmail(email);
  await registration.fillBirthDate(date);
  await registration.fillPassword("password123"); // invalid: no uppercase
  await registration.fillConfirmPassword("password123");
  await registration.fillPublicInfo(info);

  await registration.waitForInvalidFeedback();

  await expect(registration.invalidFeedback).toBeVisible();
  await expect(registration.invalidFeedback).toHaveText(
    "Must contain digit and uppercase letter!"
  );
});

test("Negative: Password Do Not Match", async () => {
  await registration.fillUsername(username);
  await registration.fillEmail(email);
  await registration.fillBirthDate(date);
  await registration.fillPassword("Password123!");
  await registration.fillConfirmPassword("password12"); // invalid: do not match
  await registration.fillPublicInfo(info);

  await registration.waitForInvalidFeedback();

  await expect(registration.invalidFeedback).toBeVisible();
  await expect(registration.invalidFeedback).toHaveText(
    "Passwords do not match!"
  );
});

test("Negative: Missing username", async () => {
  await registration.fillUsername("");
  await registration.fillEmail(email);
  await registration.fillBirthDate(date);
  await registration.fillPassword("Password123!");
  await registration.fillConfirmPassword("Password123!");
  await registration.fillPublicInfo(info);

  await registration.waitForInvalidFeedback();

  await expect(registration.invalidFeedback).toBeVisible();
  await expect(registration.invalidFeedback).toHaveText(
    "This field is required!"
  );
});
