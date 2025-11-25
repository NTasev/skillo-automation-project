// pages/NewPostPage.js
import { BasePage } from "./BasePage.js";

export class NewPostPage extends BasePage {
  constructor(page) {
    super(page);
    this.path = "/posts/create"; // adapt
    this.titleInput = page.locator('[name="title"]');
    this.descriptionInput = page.locator('[name="description"]');
    this.imageInput = page.locator('input[type="file"]');
    this.submitButton = page.locator(
      'role=button[name="Publish"], text=Publish'
    );
    this.postSuccessToast = page
      .locator(".toast-container")
      .filter({ hasText: "Post created" });
  }

  async goto() {
    await super.goto(this.path);
  }

  async createPost({ title, description, imagePath }) {
    if (title) await this.fill(this.titleInput, title);
    if (description) await this.fill(this.descriptionInput, description);
    if (imagePath) {
      // file chooser based upload
      await this.imageInput.setInputFiles(imagePath);
    }
    await this.click(this.submitButton);
  }
}
