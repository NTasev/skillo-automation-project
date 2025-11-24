import { BasePage } from "./BasePage.js";

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);

    // Registration form locators
    this.usernameInput = this.page.locator("input[name='username']");
    this.emailInput = this.page.locator("input[type='email']");
    this.birthDateInput = this.page.locator("input[type='date']");
    this.passwordInput = this.page.locator("#defaultRegisterFormPassword");
    this.confirmPasswordInput = this.page.locator(
      "#defaultRegisterPhonePassword"
    );
    this.publicInfoInput = this.page.locator("textarea[name='pulic-info']");
    this.signInButon = this.page.locator("#sign-in-button");

    // Positive feedback messages
    this.successMessage = this.page.locator(".toast-container .toast-message");

    // Negative feedback messages
    this.invalidFeedback = page.locator(".invalid-feedback");
  }

  // Navigate to registration page
  async navigate() {
    await super.goto("/users/register");
  }

  // Form actions
  async fillUsername(username) {
    await this.type(this.usernameInput, username);
  }

  async fillEmail(email) {
    await this.type(this.emailInput, email);
  }

  async fillBirthDate(date) {
    await this.type(this.birthDateInput, date);
  }

  async fillPassword(password) {
    await this.type(this.passwordInput, password);
  }

  async fillConfirmPassword(password) {
    await this.type(this.confirmPasswordInput, password);
  }

  async fillPublicInfo(info) {
    await this.type(this.publicInfoInput, info);
  }

  async signIn() {
    await this.click(this.signInButon);
  }

  // Success toast
  async waitForSuccessMessage() {
    await this.page.waitForSelector(".toast-container .toast-message", {
      state: "visible",
      timeout: 7000,
    });
  }

  // Validation errors
  async waitForInvalidFeedback() {
    await this.invalidFeedback.first().waitFor({ state: "visible" });
  }
}
