export class LoginPage {
  constructor(page) {
    this.page = page;

    // Page elements locators
    this.usernameInput = this.page.locator("#defaultLoginFormUsername");
    this.passwordInput = this.page.locator("#defaultLoginFormPassword");
    this.signInButton = this.page.locator("#sign-in-button");
    this.signInHeader = this.page.locator(".h4.mb-4");
    this.rememberMeCheckbox = this.page.locator('input[type="checkbox"]');

    // Feedback locator
    this.toastMessage = this.page.locator("#toast-container");
  }

  async goto() {
    await this.page.goto("/users/login");
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
      // Wait for checkbox to be visible
      await this.rememberMeCheckbox.waitFor({
        state: "visible",
      });

      const isChecked = await this.rememberMeCheckbox.isChecked();

      if (isChecked !== shouldCheck) {
        await this.rememberMeCheckbox.setChecked(shouldCheck);
        console.log(`✅ Remember Me checkbox is now set to ${shouldCheck}`);
      } else {
        console.log(
          `⚠️ Remember Me checkbox skipping check... already ${shouldCheck}`
        );
      }
    } catch (error) {
      console.error(`❌ Failed to set Remember Me checkbox:`, error);
      throw error;
    }
  }

  // Click Sign-in button only if enabled, with logging for better traceability and try-catch for error handling
  async submitIfEnabled() {
    try {
      const isEnabled = await this.signInButton.isEnabled();

      if (isEnabled) {
        await this.signInButton.click();
        console.log("✅ Sign-in button clicked successfully");
        return true;
      }

      console.warn("⚠️ Sign-in button is disabled, skipping click");
      return false;
    } catch (error) {
      console.error("❌ Failed to click Sign-in button:", error);
      throw error;
    }
  }

  // Main login flow
  async login(username, password, rememberMe = true) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.checkRememberMe(rememberMe); // default true
    await this.signInButton.click();

    await this.toastMessage.waitFor({ state: "visible" });
  }

  // Verify that login page is loaded after successful logout.spec.js
  async isLoaded() {
    await this.page.waitForURL("**/users/login");
    await this.signInHeader.waitFor({ state: "visible" });
  }
}
