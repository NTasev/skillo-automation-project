import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.homeButton = this.page.locator("#nav-link-home");
  }

  async isLoaded() {
    await this.page.waitForURL("**/posts/all");
    await this.homeButton.waitFor({ state: "visible" });
  }
}
