export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Locators for profile elements
    this.profileName = this.page.locator(".profile-user-settings h2");
    this.profilePost = this.page.locator("div.gallery-item");

    // Locators for post elements
    this.postImage = this.page.locator(".post-img img").first();
    this.postUsername = this.page.locator("a.post-user");
    this.postTitle = this.page.locator("div.post-title");
  }

  async goto() {
    await this.page.goto("/users/");
    await this.page.waitForLoadState("networkidle");
  }

  //Loading page profile - using it for login page validation
  async isLoaded() {
    await this.profileName.waitFor({ state: "visible", timeout: 5000 });
  }

  async openLastPost() {
    const lastPost = this.profilePost.first(); // container of the post
    await lastPost.waitFor();

    // Click the container instead of the image
    await lastPost.click();
  }
}
