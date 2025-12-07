export class HomePage {
  constructor(page) {
    this.page = page;

    // Page elements locators
    this.linkProfile = this.page.locator("#nav-link-profile");
    this.linkNewPost = this.page.locator("#nav-link-new-post");
    this.logoutButton = this.page.locator("a:has(.fa-sign-out-alt)");
  }

  async goto() {
    await this.page.goto("/posts/all");
  }

  // Verify that the home page is loaded
  async isLoaded() {
    await this.page.waitForURL("/posts/all");
    await this.linkProfile.waitFor({ state: "visible" });
    await this.linkNewPost.waitFor({ state: "visible" });
  }

  // Navigate to the user's profile page
  async goToProfile() {
    await this.linkProfile.click();
    await this.page.waitForURL(/\/users\/\d+/);
  }

  // Log out the current user
  async logout() {
    await this.logoutButton.click();
  }
}
