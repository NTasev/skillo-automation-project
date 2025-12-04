export class RegistrationPage {
  constructor(page) {
    this.page = page;

    // Page locators
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

    // Feedback locators
    this.toastContainer = this.page.locator(".toast-container");
    this.invalidFeedback = this.page.locator(".invalid-feedback");
  }

  async goto() {
    await this.page.goto("/users/register");
  }

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

  // Click the sign-up button if enabled with better traceability and error handling
  async clickIfEnabled() {
    try {
      const enabled = await this.signInButton.isEnabled();

      if (enabled) {
        await this.signInButton.click();
        console.log("✅ Sign-up button clicked successfully.");
        return true;
      }

      console.warn("⚠️ Sign-up button is disabled, skipping click.");
      return false;
    } catch (error) {
      console.error("❌ Failed to click the sign-up button:", error);
      throw error; // re-throw so the test still fails
    }
  }

  // Perform full registration action
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

    await this.signInButton.click();

    await this.toastContainer.waitFor({ state: "visible" });
  }
}
