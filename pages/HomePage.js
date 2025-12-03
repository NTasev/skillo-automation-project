export class HomePage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.linkProfile = this.page.locator("#nav-link-profile");
    this.linkNewPost = this.page.locator("#nav-link-new-post");
    this.logoutButton = this.page.locator("a:has(i.fas.fa-sign-out-alt)");
  }

  // Navigate to home page
  async goto() {
    await this.page.goto("/posts/all");
  }

  // Pure wait method to ensure home page is ready
  async isLoaded() {
    await this.linkProfile.waitFor({ state: "visible" });
    await this.linkNewPost.waitFor({ state: "visible" });
  }

  // Navigate to profile page
  async goToProfile() {
    await this.linkProfile.click();
    await this.page.waitForURL(/\/users\/\d+/);
  }

  // Navigate to new post page
  async goToNewPost() {
    await this.linkNewPost.click();
    await this.page.waitForURL("**/posts/create");
  }

  // Logout user
  async logout() {
    await this.logoutButton.click();
    await this.page.waitForURL("**/users/login");
  }
}

