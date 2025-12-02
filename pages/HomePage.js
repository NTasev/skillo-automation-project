export class HomePage {
  constructor(page) {
    this.page = page;

    // Prefer stable locators
    this.linkProfile = page.getByRole("link", { name: "Profile" });
    this.linkNewPost = page.getByRole("link", { name: "New post" });

    // Logout (target the <li> or <a>, not the icon)
    this.logoutButton = page.locator("a:has(i.fas.fa-sign-out-alt)");
  }

  async goto() {
    await this.page.goto("/posts/all", { waitUntil: "domcontentloaded" });
    await this.isLoaded();
  }

  async isLoaded() {
    await this.linkProfile.waitFor({ state: "visible" });
    await this.linkNewPost.waitFor({ state: "visible" });
  }

  async goToProfile() {
    await this.linkProfile.click();
    await this.page.waitForURL(/\/users\/\d+/, {
      waitUntil: "domcontentloaded",
    });
  }

  async goToNewPost() {
    await this.linkNewPost.click();
    await this.page.waitForURL("**/posts/create");
  }

  async ensureLogoutVisible() {
    if (!(await this.logoutButton.isVisible())) {
      await this.page.getByRole("button", { name: /menu/i }).click();
    }

    await this.logoutButton.waitFor({ state: "visible" });
  }

  async logout() {
    await this.ensureLogoutVisible();
    await this.logoutButton.click();
    await this.page.waitForURL("**/users/login");
  }
}
