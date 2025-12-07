export class LoginPage {
  constructor(page) {
    this.page = page;

    // Page elements locators
    this.usernameInput = this.page.locator("#defaultLoginFormUsername");
    this.passwordInput = this.page.locator("#defaultLoginFormPassword");
    this.signInButton = this.page.locator("#sign-in-button");
    this.signInHeader = this.page.locator("p.h4.mb-4");
    this.rememberMeCheckbox = this.page.locator('input[type="checkbox"]');

    // Feedback locator
    this.toastMessage = this.page.locator("#toast-container");
  }

  async goto() {
    await this.page.goto("/users/login");
  }

  async isLoaded() {
    await this.page.waitForURL("/users/login");
    await this.signInHeader.waitFor({ state: "visible" });
  }

  async fillUsername(username) {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.signInButton.click();
  }

  // Handle Remember Me checkbox state based on parameter (checked/unchecked) and using try-catch for better error handling
  async checkRememberMe(shouldCheck = true) {
    try {
      const isChecked = await this.rememberMeCheckbox.isChecked();

      if (isChecked !== shouldCheck) {
        await this.rememberMeCheckbox.setChecked(shouldCheck);
        console.log(`✅ Remember Me checkbox is now set`);
      } else {
        console.log(`⚠️ Remember Me checkbox skipping check`);
      }
    } catch (error) {
      console.error(`❌ Failed to set Remember Me checkbox:`, error);
      throw error;
    }
  }

  // Main login flow
  async login(username, password, rememberMe = true) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.checkRememberMe(rememberMe);
    await this.signInButton.click();

    await this.toastMessage.waitFor({ state: "visible" });
  }

  async waitForLogoutToastMessage() {
    await this.toastMessage.waitFor({ state: "visible" });
  }
}
