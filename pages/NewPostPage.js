export class NewPostPage {
  constructor(page) {
    this.page = page;

    // Form fields
    this.titleInput = page.locator('[name="title"]');
    this.descriptionInput = page.locator('[name="description"]');
    this.imageInput = page.locator('input[type="file"]');

    // Buttons
    this.submitButton = page.getByRole("button", { name: /publish/i });

    // Toast message
    this.postSuccessToast = page
      .locator(".toast-container .toast-message")
      .filter({ hasText: "Post created" });
  }

  // Navigate to new post creation page
  async goto() {
    await this.page.goto("/posts/create");
  }

  // Create a post
  async createPost({ title, description, imagePath }) {
    if (title !== undefined) {
      await this.titleInput.fill(title);
    }

    if (description !== undefined) {
      await this.descriptionInput.fill(description);
    }

    if (imagePath) {
      await this.imageInput.setInputFiles(imagePath);
    }

    await this.submitButton.click();
  }

  // Wait for toast confirmation
  async waitForPostCreatedToast(timeout = 7000) {
    await this.postSuccessToast.waitFor({ state: "visible", timeout });
  }
}
