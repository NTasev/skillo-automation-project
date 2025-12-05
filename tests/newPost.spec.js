import { test, expect } from "./fixtures/auth.js";

// Positive test case - Successful Post Creation //

test("✅TC01: New post should pass with image and caption", async ({
  profilePage,
  authUser,
}) => {
  const username = process.env.TEST_USER_CREDENTIAL_AUTHUSER;

  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Fill in post details and submit
  await authUser.uploadImage("test-data/the-office-handshake.jpg");
  await authUser.setCaption(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await authUser.waitForToastMessage();
  await expect(authUser.toastMessage).toContainText("Post created!");

  // Verify the post appears on the profile page
  await profilePage.isLoaded();
  await profilePage.openRecentPost();

  // Assertions to verify post details
  await expect(profilePage.postImage).toBeVisible();
  await expect(profilePage.postUsername).toHaveText(username);
  await expect(profilePage.postTitle).toHaveText(
    "How it feels when I fix a bug no one knew I was responsible for"
  );
});

// Negative test cases - Missing Required Fields //

test("❌TC02: New post should fail with missing required image", async ({
  authUser,
}) => {
  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Fill in post details without image and submit
  await authUser.setCaption("This post has no image");
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await authUser.waitForToastMessage();
  await expect(authUser.toastMessage).toContainText("Please upload an image!");
});

test("❌TC03: New post should fail with missing required caption", async ({
  authUser,
}) => {
  await expect(authUser.postHeading).toHaveText(
    "Post a picture to share with your awesome followers"
  );

  // Fill in post details without caption and submit
  await authUser.uploadImage("test-data/the-office-handshake.jpg");
  await authUser.setCaption("");
  await authUser.setPostStatus(true);
  await authUser.submitPost();

  await authUser.waitForToastMessage();
  await expect(authUser.toastMessage).toContainText("Please enter caption!");
});
