export class NewPostPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.postHeading = this.page.locator("h3");
    this.browseButton = this.page.locator("#choose-file");
    this.imagePreview = this.page.locator(".post-item");
    this.captionInput = this.page.locator('input[name="caption"]');

    // Buttons
    this.postStatusCheckbox = page.locator("#customSwitch2");
    this.createPostButton = page.locator("#create-post");

    // Correct file input (hidden Angular input)
    this.hiddenFileInput = page
      .locator('input[type="file"][formcontrolname="coverUrl"]')
      .first();

    // Success/error message
    this.toastMessage = page.locator("div.toast-message");
  }

  // Navigate to new post page
  async goto() {
    await this.page.goto("/posts/create");
    await this.page.waitForLoadState("networkidle");
  }

  // Upload image file
  async uploadImage(filePath) {
    // Ensure the hidden input exists
    await this.hiddenFileInput.waitFor({ state: "attached" });

    // Upload file
    await this.hiddenFileInput.setInputFiles(filePath);
  }

  // Set caption text
  async setCaption(text) {
    await this.captionInput.fill(text);
  }

  // Set post status (public/private)
  async setPostStatus(publicStatus = true) {
    const currentlyChecked = await this.postStatusCheckbox.isChecked();
    if (currentlyChecked !== publicStatus) {
      await this.postStatusCheckbox.click();
    }
  }

  async submitPost() {
    await this.createPostButton.click();
  }

  // Full post creation flow
  async createPostFull({ filePath, caption, publicStatus = true }) {
    await this.uploadImage(filePath);
    if (caption) await this.setCaption(caption);
    await this.setPostStatus(publicStatus);
    await this.submitPost();
  }
}
