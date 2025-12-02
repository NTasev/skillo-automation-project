export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Profile page elements
    this.profileHeader = this.page.locator("h2");
    this.posts = this.page.locator("div.gallery-item");

    // Post elements
    this.postUsername = this.page.locator(".post-user");
    this.postTitle = this.page.locator(".post-title");
  }

  async goto(userId) {
    await this.page.goto(`/users/${userId}`, { waitUntil: "domcontentloaded" });
    await this.isLoaded();
  }

  async isLoaded() {
    await this.profileHeader.waitFor({ state: "visible" });
  }

  async openRecentPost() {
    const firstPost = this.posts.first();

    await firstPost.waitFor({ state: "visible" });
    await firstPost.click();

    // Validate post modal page opened (optional)
    await this.page.waitForSelector(".post-modal-img", { state: "visible" });
  }
}
