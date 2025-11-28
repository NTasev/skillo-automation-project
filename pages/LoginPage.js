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

  async checkRememberMe(shouldCheck = true) {
    const isChecked = await this.rememberMeCheckbox.isChecked();

    if (isChecked !== shouldCheck) {
      console.log("Toggling Remember Me checkbox");
      await this.rememberMeCheckbox.click();
      // tiny wait for UI to catch up
      await this.page.waitForTimeout(50);
    }
  }

  async clickSignIn() {
    const enabled = await this.signInButton.isEnabled();

    if (enabled) {
      console.log("Sign In button is enabled. Clicking it.");
      await this.signInButton.click();
    } else {
      console.log("Sign In button is disabled. Cannot click.");
    }
  }

  async login(username, password, rememberMe = false) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    if (rememberMe) await this.checkRememberMe(true);
    await this.clickSignIn();
  }
}
