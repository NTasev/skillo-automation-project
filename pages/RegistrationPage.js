export class RegistrationPage {
  constructor(page) {
    this.page = page;
    // Registration form locators
    this.usernameInput = this.page.locator("input[name='username']");
    this.emailInput = this.page.locator("input[type='email']");
    this.birthDateInput = this.page.locator("input[type='date']");
    this.passwordInput = this.page.locator("#defaultRegisterFormPassword");
    this.confirmPasswordInput = this.page.locator(
      "#defaultRegisterPhonePassword"
    );
    this.publicInfoInput = this.page.locator("textarea[name='pulic-info']");
    this.signInButton = this.page.locator("#sign-in-button");
    this.successMessage = this.page.locator(".toast-container .toast-message");
    this.invalidFeedback = this.page.locator(".invalid-feedback");
  }

  // Navigate to registration page
  async goto() {
    await this.page.goto("/users/register");
  }

  // Form actions
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillBirthDate(date) {
    await this.birthDateInput.fill(date);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async fillConfirmPassword(password) {
    await this.confirmPasswordInput.fill(password);
  }

  async fillPublicInfo(info) {
    await this.publicInfoInput.fill(info);
  }

  async signIn() {
    await this.signInButton.click();
  }

  async waitForSuccessMessage() {
    await this.successMessage.waitFor({ state: "visible", timeout: 5000 });
  }
}
