import { test, expect } from "./fixtures/auth.js";
import { NewPostPage } from "../pages/NewPostPage.js";

test("✅TC01: Successful new post creation with image and caption", async ({
  authUser,
  profilePage,
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

  // Verify success message
  await expect(newPost.toastMessage).toBeVisible();
  await expect(newPost.toastMessage).toHaveText("Post created!");

  // Verify post appears on profile
  await profilePage.isLoaded();
  await expect(profilePage.postImage).toBeVisible();

  // Open the last post
  await profilePage.openLastPost();
  await expect(profilePage.postTitle).toHaveText("Hello from QA!");
});
