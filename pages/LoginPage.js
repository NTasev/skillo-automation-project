export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator("#defaultLoginFormUsername");
    this.passwordInput = page.locator("#defaultLoginFormPassword");
    this.signInButton = page.locator("#sign-in-button");
    this.signInHeader = page.locator("p.h4.mb-4");
    this.toastMessage = page.locator("div.toast-message"); // unified for success/error
    this.rememberMeCheckbox = page.locator('[formcontrolname="rememberMe"]');
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

  async checkRememberMe(shouldCheck = false) {
    // Wait for the checkbox to be attached to the DOM and visible
    await this.rememberMeCheckbox.waitFor({ state: "attached", timeout: 5000 });
    await this.rememberMeCheckbox.waitFor({ state: "visible", timeout: 5000 });

    // Get current checked state
    const isChecked = await this.rememberMeCheckbox.isChecked();

    if (isChecked !== shouldCheck) {
      if (shouldCheck) {
        await this.rememberMeCheckbox.check();
      } else {
        await this.rememberMeCheckbox.uncheck();
      }
    }
  }

  async submitIfEnabled() {
    const isEnabled = await this.signInButton.isEnabled();
    if (isEnabled) {
      await this.signInButton.click();
      return true;
    } else return false;
  }

  async login(username, password, rememberMe = true) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.checkRememberMe(rememberMe);
    await this.signInButton.click();
  }
}
