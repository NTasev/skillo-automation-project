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
    this.signUpHeader = this.page.locator("h4");
    this.toastContainer = this.page.locator(".toast-container");
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

  async fillConfirmPassword(confirmPassword) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async fillPublicInfo(info) {
    await this.publicInfoInput.fill(info);
  }
  
  // Button check
  async isSignInButtonEnabled() {
    return await this.signInButton.isEnabled();
  }

  // Click button with same logic as loginPage
  async clickSignIn() {
    const enabled = await this.signInButton.isEnabled();
    if (enabled) {
      console.log("Sign Up button is enabled. Clicking it.");
      await this.signInButton.click();
    } else {
      console.log("Sign Up button is disabled. Cannot click (UI validation).");
    }
  }

  async registration({
    username,
    email,
    date,
    password,
    confirmPassword,
    info,
  }) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.birthDateInput.fill(date);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.publicInfoInput.fill(info);

    await this.clickSignIn(); // clicks only if enabled
  }
}
