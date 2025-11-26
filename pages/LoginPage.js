export class LoginPage {
  constructor(page) {
    this.page = page;

    this.usernameInput = page.locator("#defaultLoginFormUsername");
    this.passwordInput = page.locator("#defaultLoginFormPassword");
    this.rememberMeButton = page.locator('[formcontrolname="rememberMe"]');
    this.signInButton = page.locator("#sign-in-button");
    this.errorMessage = page.locator(".invalid-feedback");
    this.successMessage = page.locator(".toast-container .toast-message");
    this.loginNavLink = page.locator("#nav-link-login");
  }

  async goto() {
    await this.page.goto("/users/login");
  }

  async login(username, password, rememberMe = false) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    if (rememberMe) {
      await this.rememberMeButton.click();
    }

    // Click only if button is enabled
    if (await this.signInButton.isEnabled()) {
      await this.signInButton.click();
    }
  }

  async waitForSuccessMessage() {
    await this.successMessage.waitFor({ state: "visible" });
  }

  async waitForErrorMessage() {
    await this.errorMessage.waitFor({ state: "visible" });
  }

  async isLoginPage() {
    await this.loginNavLink.waitFor({ state: "visible" });
  }
}
