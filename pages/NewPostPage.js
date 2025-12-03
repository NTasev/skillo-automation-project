import { time } from "console";

export class NewPostPage {
  constructor(page) {
    this.page = page; // Page elements

    this.postHeading = this.page.locator("h3");
    this.browseButton = this.page.locator("#choose-file");
    this.imagePreview = this.page.locator(".post-item");
    this.captionInput = this.page.locator('input[name="caption"]');

    this.statusCheckbox = this.page.locator("#customSwitch2");
    this.createPostButton = this.page.locator("#create-post"); // Correct file input (hidden Angular input)

    this.fileInput = this.page.locator('input[type="file"].file');

    this.toastMessage = this.page.locator("#toast-container");
  }

  // Navigate to new post page
  async goto() {
    await this.page.goto("/posts/create");
  }

  // Upload image file
  async uploadImage(imagePath) {
    await this.fileInput.setInputFiles(imagePath);
  }

  // Set caption text
  async setCaption(text) {
    await this.captionInput.fill(text);
  }

  // Set post status (public/private)
  async setPostStatus(publicStatus = true) {
    const currentlyChecked = await this.statusCheckbox.isChecked();
    if (currentlyChecked !== publicStatus) {
      await this.statusCheckbox.check();
    }
  }

  async submitPost() {
    await this.createPostButton.click();
  }
}
