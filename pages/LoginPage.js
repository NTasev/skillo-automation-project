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
    await this.page.goto("/users/login");
    await this.page.waitForLoadState("domcontentloaded");
  }

  // Verify that login page is loaded
  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  // Fill in password
  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  // Set remember me checkbox
  async checkRememberMe(shouldCheck = false) {
    const checkbox = this.rememberMeCheckbox;

    // Wait until visible & attached
    await checkbox.waitFor({ state: "visible", timeout: 5000 });
    await checkbox.waitFor({ state: "attached", timeout: 5000 });

    const isChecked = await checkbox.isChecked();
    if (isChecked !== shouldCheck) {
      // Use click to trigger Angular change events
      await checkbox.click();
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
    await this.checkRememberMe(rememberMe);
    await this.signInButton.click();
  }
}
