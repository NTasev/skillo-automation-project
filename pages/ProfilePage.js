// pages/ProfilePage.js
import { BasePage } from "./BasePage.js";

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.path = "/profile"; // adapt
    this.userName = page.locator(".profile-username"); // adapt
    this.posts = page.locator(".profile-post"); // adapt
  }

  async goto() {
    await super.goto(this.path);
  }

  async getUsernameText() {
    return this.getText(this.userName);
  }
}
