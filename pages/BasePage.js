export class BasePage {
  constructor(page) {
    this.page = page;

    // Global toast elements
    this.toastContainer = page.locator(".toast-container");
  }

  // ---- Navigation ----
  async goto(path) {
    await this.page.goto(`http://training.skillo-bg.com:4300${path}`, {
      waitUntil: "networkidle",
    });
  }
  // ---- Interaction Helpers ----
  async click(locator) {
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  async type(locator, text) {
    await locator.waitFor({ state: "visible" });
    await locator.fill(text);
  }

  async waitForVisible(locator, timeout = 7000) {
    await locator.waitFor({ state: "visible", timeout });
  }

  async waitForHidden(locator, timeout = 7000) {
    await locator.waitFor({ state: "hidden", timeout });
  }

  // ---- Toast Handling ----
  async waitForToast(timeout = 7000) {
    await this.toastMessage.waitFor({ state: "visible", timeout });
    return this.toastMessage;
  }

  async getToastText() {
    return this.toastMessage.textContent();
  }
}
