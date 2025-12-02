import { test, expect } from "./fixtures/auth.js";

test.beforeEach(async ({ authUser, newPostPage }) => {
  // Ensure the authUser fixture is ready
  await authUser;

  // Navigate to the New Post page with controlled wait
  await newPostPage.goto({ waitUntil: "domcontentloaded" });

  // Wait for the main post form to be visible
  await newPostPage.postHeading.waitFor({ state: "visible", timeout: 5000 });
});

// ------------------------------------
// POSITIVE TEST CASES
// ------------------------------------

test("✅TC01: New post should pass with image and caption", async ({
  profilePage,
  newPostPage,
}) => {
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Fill in post details
  await newPostPage.uploadImage("test-data/the-office-handshake.jpg");
  await newPostPage.setCaption(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  await expect(newPostPage.toastMessage).toHaveText("Post created!");

  // Verify post appears in the user profile
  await profilePage.isLoaded();
  await profilePage.openRecentPost();

  // Assertions to verify post details
  await expect(profilePage.postUsername).toBeVisible();
  await expect(profilePage.postTitle).toHaveText(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
});

// ------------------------------------
// NEGATIVE TEST CASES
// ------------------------------------

test("❌TC02: New post should fail with missing required image", async ({
  newPostPage,
}) => {
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  await newPostPage.setCaption("This post has no image");
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  await expect(newPostPage.toastMessage).toHaveText("Please upload an image!");
});

test("❌TC03: New post should fail with missing required caption", async ({
  newPostPage,
}) => {
  await expect(newPostPage.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  await newPostPage.uploadImage("test-data/the-office-handshake.jpg");
  await newPostPage.setCaption("");
  await newPostPage.setPostStatus(true);
  await newPostPage.submitPost();

  await expect(newPostPage.toastMessage).toHaveText("Please enter caption!");
});
