export class HomePage {
  constructor(page) {
    this.page = page;

    // Page elements locators
    this.linkProfile = this.page.locator("#nav-link-profile");
    this.linkNewPost = this.page.locator("#nav-link-new-post");
    this.logoutButton = this.page.locator("a:has(i.fas.fa-sign-out-alt)");
  }

  // Navigate to home page
  async goto() {
    await this.page.goto("/posts/all");
  }

  // Verify that home page is loaded with essential elements using try-catch for better error handling
  async isLoaded() {
    try {
      await this.linkProfile.waitFor({ state: "visible" });
      await this.linkNewPost.waitFor({ state: "visible" });
      console.log("✅ Home page is loaded");
    } catch (error) {
      console.error("❌ Home page did not load correctly:", error);
      throw error;
    }
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

  // Logout the valid user from logout.spec.js
  async logout() {
    await this.logoutButton.click();
  }
}
