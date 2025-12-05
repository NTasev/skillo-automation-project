export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Profile page locators
    this.profileHeader = this.page.locator("h2");
    this.profileImage = this.page.locator(".profile-image-source");
    this.posts = this.page.locator("div.gallery-item");

    // Post locators
    this.postImage = this.page.locator(".post-modal-img");
    this.postUsername = this.page.locator(".post-user");
    this.postTitle = this.page.locator(".post-title");
  }

  async goto() {
    await this.page.goto("/users/");
  }

  // Pure wait method to ensure profile page is loaded
  async isLoaded() {
    await this.page.waitForURL(/\/users\/\d+/); // regular expression pattern used to match certain strings—commonly in programming, search, or validation scenarios.
    await this.profileHeader.waitFor({ state: "visible" });
    await this.profileImage.waitFor({ state: "visible" });

    console.log("✅ Profile page is loaded");
  }

  // Open the most recent post with catch-retry logic for better error handling
  async openRecentPost() {
    const firstPost = this.posts.first();

    try {
      await firstPost.waitFor({ state: "visible" });
      await firstPost.click();
      console.log("✅ Opened the most recent post successfully.");
    } catch (error) {
      console.log(
        "⚠️ First attempt failed to open the recent post. Retrying...",
        error
      );
      try {
        // Retry after a short wait
        await firstPost.waitFor({ state: "visible" });
        await firstPost.click();
        console.log("✅ Successfully opened the post on retry.");
      } catch (retryError) {
        console.error(
          "❌ Failed to open the recent post after retry:",
          retryError
        );
        throw retryError; // re-throw so the test still fails
      }
    }
  }
}
