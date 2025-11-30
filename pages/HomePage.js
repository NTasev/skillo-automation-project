export class HomePage {
  constructor(page) {
    this.page = page;

    this.linkProfile = this.page.locator("#nav-link-profile");
    this.linkNewPost = this.page.locator("#nav-link-new-post");
    this.logoutButton = this.page.locator("i.fas.fa-sign-out-alt.fa-lg");
  }

  async goto() {
    await this.page.goto("/posts/all");
  }

  async isLoaded() {
    await this.page.waitForLoadState("networkidle");
    await this.linkProfile.waitFor({ state: "visible", timeout: 5000 });
    await this.linkNewPost.waitFor({ state: "visible", timeout: 5000 });
  }

  async goToProfile() {
    await this.page.waitForLoadState("networkidle");
    await this.linkProfile.click();
  }

  async goToNewPost() {
    await this.linkNewPost.click();
  }

  async ensureLogoutVisible() {
    // Check if logout button is visible
    if (!(await this.logoutButton.isVisible())) {
      // Click the hamburger menu
      const menuButton = this.page.locator("button.navbar-toggler");
      await menuButton.click();
    }
    // Wait for logout button to be visible
    await this.logoutButton.waitFor({ state: "visible", timeout: 5000 });
  }

  async logout() {
    await this.ensureLogoutVisible(); // make sure logout button is visible
    await this.logoutButton.click();
  }
}
