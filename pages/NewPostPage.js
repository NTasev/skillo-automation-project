export class NewPostPage {
  constructor(page) {
    this.page = page;

    // Page elements
    this.postHeading = this.page.locator("h3");
    this.browseButton = this.page.locator("#choose-file");
    this.imagePreview = this.page.locator(".image-preview");
    this.captionInput = this.page.locator('input[name="caption"]');

    // Buttons
    this.postStatusCheckbox = page.locator("#customSwitch2");
    this.createPostButton = page.locator("#create-post");

    // Correct file input (hidden Angular input)
    this.hiddenFileInput = page
      .locator('input[type="file"][formcontrolname="coverUrl"]')
      .first();

    this.postSuccessToast = page.locator("div.toast-message");
  }

  async goto() {
    await this.page.goto("/posts/create");
    await this.page.waitForLoadState("networkidle");
  }

  async uploadImage(filePath) {
    // Ensure the hidden input exists
    await this.hiddenFileInput.waitFor({ state: "attached" });

    // Upload file
    await this.hiddenFileInput.setInputFiles(filePath);
  }

  async setCaption(text) {
    await this.captionInput.fill(text);
  }

  async setPostStatus(publicStatus = true) {
    const currentlyChecked = await this.postStatusCheckbox.isChecked();
    if (currentlyChecked !== publicStatus) {
      await this.postStatusCheckbox.click();
    }
  }

  async submitPost() {
    await this.createPostButton.click();
  }

  async createPostFull({ filePath, caption, publicStatus = true }) {
    await this.uploadImage(filePath);
    if (caption) await this.setCaption(caption);
    await this.setPostStatus(publicStatus);
    await this.submitPost();
  }
}
