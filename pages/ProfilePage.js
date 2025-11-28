export class ProfilePage {
  constructor(page) {
    this.page = page;

    // Locators (adapt selectors as needed)
    this.profileName = this.page.locator("div.profile-user-settings h2");
    this.profilePost = this.page.locator(".profile-post img");
  }

  // Get username text after navigating via HomePage
  async getProfileName() {
    return this.profileName.textContent({ state: "visible", timeout: 10000 });
  }

  // Wait until profile is fully loaded
  async goToProfile() {
    await this.profileLink.click();
    await this.page.waitForLoadState("networkidle"); // wait for all requests
  }

  async waitForProfileName() {
    await this.profileName.waitFor({ state: "visible", timeout: 10000 });
  }
}
