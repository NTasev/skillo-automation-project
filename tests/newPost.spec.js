import { test, expect } from "./fixtures/auth.js";
import { NewPostPage } from "../pages/NewPostPage.js";

test("✅TC01: Successful new post creation with image and caption", async ({
  authUser,
}) => {
  const newPost = new NewPostPage(authUser);

  // Go to create post page
  await newPost.goto();

  // Assertions
  await expect(newPost.postHeading).toBeVisible();
  await expect(newPost.browseButton).toBeVisible();

  // Create a post with image + caption
  await newPost.createPostFull({
    filePath: "test-data/test-image.jpg",
    caption: "Hello from QA!",
    publicStatus: true,
  });

  // Assert image preview appears (optional UI check)
  await expect(newPost.postSuccessToast).toBeVisible();
  await expect(newPost.postSuccessToast).toHaveText("Post created!");
  await expect(newPost.imagePreview).toBeVisible();
});
