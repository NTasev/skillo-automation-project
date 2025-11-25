// pages/HomePage.js
import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.path = "/posts/all";
    this.newPostButton = page.locator(
      'role=button[name="New Post"], text=New Post'
    );
    this.postCards = page.locator(".post-card"); // adapt
    this.logoutButton = page.locator('role=button[name="Logout"], text=Logout');
    this.profileIcon = page.locator(".profile-icon"); // adapt
  }

  async goto() {
    await super.goto(this.path);
  }

  async openNewPost() {
    await this.click(this.newPostButton);
  }

  async logout() {
    await this.click(this.logoutButton);
  }

  async postCount() {
    return this.postCards.count();
  }
}
