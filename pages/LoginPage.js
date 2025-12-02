export class LoginPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.usernameInput = this.page.locator("#defaultLoginFormUsername");
    this.passwordInput = this.page.locator("#defaultLoginFormPassword");
    this.signInButton = this.page.locator("#sign-in-button");
    this.signInHeader = this.page.locator(".h4.mb-4");
    this.rememberMeCheckbox = this.page.locator(
      '[formcontrolname="rememberMe"]'
    );

    // Feedback locators
    this.toastMessage = this.page.locator("#toast-container"); // unified for success/error
  }

  // Navigate to login page
  async goto() {
    // Uses baseURL from config
    await this.page.goto("/users/login", { waitUntil: "domcontentloaded" });
  }

  // Verify that login page is loaded
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  // Fill in password
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }

  async checkRememberMe(shouldCheck = true) {
    // Wait for checkbox to be visible and enabled
    await this.rememberMeCheckbox.waitFor({ state: "visible", timeout: 5000 });

    // Only change state if it differs from desired
    const isChecked = await this.rememberMeCheckbox.isChecked();

    if (isChecked !== shouldCheck) {
      await this.rememberMeCheckbox.setChecked(shouldCheck);
    }
  }

  async submitIfEnabled() {
    const isEnabled = await this.signInButton.isEnabled();
    if (isEnabled) {
      await this.signInButton.click();
      return true;
    } else return false;
  }

  // Main login flow
  async login(username, password, rememberMe = true) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.checkRememberMe(rememberMe); // default true
    // Calls the standard click, relying on Playwright to wait if enabled.
    await this.signInButton.click();
  }
}
