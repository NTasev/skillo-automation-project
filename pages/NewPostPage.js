export class NewPostPage {
  constructor(page) {
    this.page = page;

    // Page elements locators
    this.postHeading = this.page.locator("h3");
    this.browseButton = this.page.locator("#choose-file");
    this.imagePreview = this.page.locator(".post-item");
    this.captionInput = this.page.locator('input[name="caption"]');

    // Buttons and controls locators
    this.statusCheckbox = this.page.locator("#customSwitch2");
    this.createPostButton = this.page.locator("#create-post");

    // File input (hidden) locator
    this.fileInput = this.page.locator('input[type="file"].file'); // Correct file input (hidden Angular input)

    // Feedback locator
    this.toastMessage = this.page.locator("#toast-container");
  }

  async goto() {
    await this.page.goto("/posts/create");
  }

  // Uploading image with error handling for better traceability
  async uploadImage(imagePath) {
    try {
      await this.fileInput.setInputFiles(imagePath);
      console.log(`✅ Image uploaded successfully: ${imagePath}`);
    } catch (error) {
      console.error(`❌ Failed to upload image from path: ${imagePath}`, error);
      throw error;
    }
  }

  async setCaption(text) {
    await this.captionInput.fill(text);
  }

  // Check or uncheck post status based on parameter
  async setPostStatus(publicStatus = true) {
    const currentlyChecked = await this.statusCheckbox.isChecked();

    if (currentlyChecked !== publicStatus) {
      await this.statusCheckbox.check();
    }
  }

  async submitPost() {
    await this.createPostButton.click();
  }

  async waitForToastMessage() {
    await this.toastMessage.waitFor({ state: "visible" });
  }
}
