// pages/LoginPage.js
import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = "/users/login";
    this.usernameInput = this.page.locator("#defaultLoginFormUsername");
    this.passwordInput = this.page.locator("#defaultLoginFormPassword");
    this.rememberMeButton = this.page.locator(
      "input[type='remember-me-button ng-untouched ng-pristine ng-valid']"
    );
    this.signInButton = this.page.locator("#sign-in-button");

    // Feedback messages
    this.invalidFeedback = page.locator(".invalid-feedback");
    this.successMessage = page.locator(".toast-container .toast-message");
  }

  async goto() {
    await super.goto(this.path);
  }

  async login(username, password) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.signInButton);
  }

  // Wait for success toast
  async waitForSuccessMessage(timeout = 7000) {
    await this.successMessage.waitFor({ state: "visible", timeout });
  }

  // Wait for validation error
  async waitForInvalidFeedback(timeout = 7000) {
    await this.invalidFeedback.first().waitFor({ state: "visible", timeout });
  }
}
