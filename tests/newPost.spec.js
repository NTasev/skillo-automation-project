import { test, expect } from "./fixtures/auth.js";

test.beforeEach(async ({ authUser, newPostPage }) => {
  // Navigate to create post page
  await newPostPage.goto();
  console.log(`Navigated to New Post page with ${authUser}`);
});

test("✅TC01.Positive: New post should pass with image and caption", async ({
  profilePage,
  newPostPage,
}) => {
  // Assertions
  await expect(newPostPage.postHeading).toBeVisible();
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Create a post with image + caption
  await newPostPage.uploadImage("test-data/test-image.jpg");
  await newPostPage.setCaption("Hello from QA!");
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  // Verify success message
  await expect(newPostPage.toastMessage).toBeVisible();
  await expect(newPostPage.toastMessage).toHaveText("Post created!");

  // Verify post appears in profile
  await profilePage.isLoaded();
  await profilePage.openRecentPost();
  await expect(profilePage.postUsername).toBeVisible();
  await expect(profilePage.postTitle).toHaveText("Hello from QA!");
});

test("❌TC02.Negative: New post should fail with missing required image", async ({
  newPostPage,
}) => {
  // Assertions
  await expect(newPostPage.postHeading).toBeVisible();
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Create a post without image but with caption
  await newPostPage.setCaption("This post has no image");
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  // Verify error message
  await expect(newPostPage.toastMessage).toBeVisible();
  await expect(newPostPage.toastMessage).toHaveText("Please upload an image!");
});

test("❌TC03.Negative: New post should fail with missing required caption", async ({
  newPostPage,
}) => {
  // Assertions
  await expect(newPostPage.postHeading).toBeVisible();
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Create a post with image but without caption
  await newPostPage.uploadImage("test-data/test-image.jpg");
  await newPostPage.setCaption("");
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  // Verify error message
  await expect(newPostPage.toastMessage).toBeVisible();
  await expect(newPostPage.toastMessage).toHaveText("Please enter caption!");
});
