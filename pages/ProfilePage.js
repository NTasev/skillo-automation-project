export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Profile page elements
    this.profileHeader = this.page.locator("h2");
    this.posts = this.page.locator("div.gallery-item");

    // Post elements (for the opened post)
    this.postUsername = this.page.locator(".post-user");
    this.postTitle = this.page.locator(".post-title");
  }

  // Navigate to a specific user's profile
  async goto() {
    await this.page.goto("/users/");
  }

  // Pure wait method to ensure profile page is loaded
  async isLoaded() {
    await this.profileHeader.waitFor({ state: "visible" });
  }

  // Open the most recent post (first post in the gallery)
  async openRecentPost() {
    const firstPost = this.posts.first();
    await firstPost.waitFor({ state: "visible" });
    await firstPost.click();
    // optional: wait for post details to load
    await this.postUsername.waitFor({ state: "visible" });
    await this.postTitle.waitFor({ state: "visible" });
  }
}
