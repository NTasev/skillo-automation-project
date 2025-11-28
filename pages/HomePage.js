export class HomePage {
  constructor(page) {
    this.page = page;

    this.linkProfile = this.page.locator("#nav-link-profile");
    this.linkNewPost = this.page.locator("#nav-link-new-post");
    this.linkLogout = this.page.locator("#nav-link-logout");
  }

  async goto() {
    await this.page.goto("/posts/all");
  }

  async isLoaded() {
    await this.linkProfile.waitFor({ state: "visible" });
    await this.page.waitForLoadState("networkidle");
  }

  async goToProfile() {
    await Promise.all([
      this.page.waitForLoadState("networkidle"),
      this.linkProfile.click(),
    ]);
  }

  async goToNewPost() {
    await this.linkNewPost.click();
  }

  async logout() {
    await this.linkLogout.click();
  }
}
