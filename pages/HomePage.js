export class HomePage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.homeButton = this.page.locator("#nav-link-home");
  }

  async goto() {
    await this.page.goto("/posts/all");
  }

  async isLoaded() {
    await this.homeButton.waitFor({ state: "visible", timeout: 5000 });
  }
}
