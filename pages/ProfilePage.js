export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Locators (adapt selectors as needed)
    this.username = page.locator(".profile-username");
    this.posts = page.locator(".profile-post");
  }

  // Navigate to profile page
  async goto() {
    await this.page.goto("/profile");
  }

  // Returns the username text
  async getUsernameText() {
    return await this.username.textContent();
  }

  // Returns the count of posts from the profile
  async getPostCount() {
    return await this.posts.count();
  }

  // Get text content of post by index
  async getPostText(index) {
    return await this.posts.nth(index).textContent();
  }

  // Wait until profile is fully loaded
  async waitForProfileLoaded() {
    await this.username.waitFor({ state: "visible" });
  }
}
