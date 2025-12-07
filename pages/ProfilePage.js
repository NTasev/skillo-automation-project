export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Profile page locators
    this.profileHeader = this.page.locator("h2");
    this.profileImage = this.page.locator(".profile-image-source");
    this.posts = this.page.locator("div.gallery-item");
    this.noPostsMessage = this.page.locator("h3:has-text('No posts here')");

    // Post locators
    this.postImage = this.page.locator(".post-modal-img");
    this.postUsername = this.page.locator(".post-user");
    this.postTitle = this.page.locator(".post-title");

    // Delete post locators
    this.deleteButton = this.page.locator("label.delete-ask");
    this.confirmDeleteButton = this.page.locator('button:has-text("Yes")');

    // Feedback locator
    this.toastMessage = this.page.locator("#toast-container");
  }

  async goto() {
    await this.page.goto("/users/10033"); // Using a fixed user ID for testing
  }

  async isLoaded() {
    await this.page.waitForURL(/\/users\/\d+/); // regular expression pattern used to match certain strings—commonly in programming, search, or validation scenarios.
    await this.profileHeader.waitFor({ state: "visible" });
    await this.profileImage.waitFor({ state: "visible" });
  }

  // Open the most recent post with catch-retry logic for better error handling
  async openRecentPost() {
    const recentPost = this.posts.first();

    try {
      await recentPost.waitFor({ state: "visible", timeout: 5000 });
      await recentPost.click();
      console.log("✅ Opened the most recent post.");
    } catch (error) {
      console.log(
        "⚠️ First attempt failed to open the recent post. Retrying...",
        error
      );
      try {
        // Retry after a short wait
        await recentPost.waitFor({ state: "visible", timeout: 5000 });
        await recentPost.click();
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

  // Delete the most recent post if it exists for cleanup session in newPost.spec.js
  async deleteRecentPost() {
    const recentPost = await this.posts.first();
    try {
      if (await recentPost.isVisible()) {
        console.log("ℹ️ Post found: Initiating deletion...");

        // Click the post to open it
        await recentPost.click();
        await this.deleteButton.click();

        // Click confirm delete button
        await this.confirmDeleteButton.click();

        // Wait for toast message to confirm deletion
        await this.toastMessage.waitFor({ state: "visible" });

        console.log("🧹 Cleanup successful: Post deleted.");
        return true;
      } else {
        // If no posts are visible, wait for the no posts message
        await this.noPostsMessage.waitFor({ state: "visible" });

        console.log("ℹ️ No posts found to delete.");
        return false;
      }
    } catch (error) {
      console.error("❌ Error during cleanup:", error);
      return false;
    }
  }
}
