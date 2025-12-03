import { test, expect } from "./fixtures/auth.js";

// ------------------------------------
// POSITIVE TEST CASES
// ------------------------------------

test("✅TC01: New post should pass with image and caption", async ({
  profilePage,
  authUser,
}) => {
  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Fill in post details
  await authUser.uploadImage("test-data/the-office-handshake.jpg");
  await authUser.setCaption(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await expect(authUser.toastMessage).toHaveText("Post created!");

  // Verify post appears in the user profile
  await profilePage.isLoaded();
  await profilePage.openRecentPost();

  // Assertions to verify post details
  await expect(profilePage.postImage).toBeVisible();
  await expect(profilePage.postUsername).toBeVisible();
  await expect(profilePage.postTitle).toHaveText(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
});

// ------------------------------------
// NEGATIVE TEST CASES
// ------------------------------------

test("❌TC02: New post should fail with missing required image", async ({
  authUser,
}) => {
  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  await authUser.setCaption("This post has no image");
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await expect(authUser.toastMessage).toHaveText("Please upload an image!");
});

test("❌TC03: New post should fail with missing required caption", async ({
  authUser,
}) => {
  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  await authUser.uploadImage("test-data/the-office-handshake.jpg");
  await authUser.setCaption("");
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await expect(authUser.toastMessage).toHaveText("Please enter caption!");
});
