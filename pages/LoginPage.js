export class LoginPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.usernameInput = page.locator("#defaultLoginFormUsername");
    this.passwordInput = page.locator("#defaultLoginFormPassword");
    this.signInButton = page.locator("#sign-in-button");
    this.signInHeader = page.locator("p.h4.mb-4");
    this.rememberMeCheckbox = page.locator('[formcontrolname="rememberMe"]');

    // Feedback locators
    this.toastMessage = page.locator("div.toast-message"); // unified for success/error
  }

  // Navigate to login page
  async goto() {
    await this.page.goto("/users/login");
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
    // Wait for the checkbox to be attached to the DOM and visible
    await this.rememberMeCheckbox.waitFor({ state: "attached", timeout: 5000 });
    await this.rememberMeCheckbox.waitFor({ state: "visible", timeout: 5000 });

    // Get current checked state
    const isChecked = await this.rememberMeCheckbox.isChecked();

    //  Toggle if needed
    if (isChecked !== shouldCheck) {
      if (shouldCheck) {
        await this.rememberMeCheckbox.check();
      } else {
        await this.rememberMeCheckbox.uncheck();
      }
    }
  }

  // Submit the login form if the button is enabled
  async submitIfEnabled() {
    const isEnabled = await this.signInButton.isEnabled();
    if (isEnabled) {
      await this.signInButton.click();
      return true;
    } else return false;
  }

  //  Perform login action
  async login(username, password, rememberMe = true) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.checkRememberMe(rememberMe);
    await this.signInButton.click();
  }
}
