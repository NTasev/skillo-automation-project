# 📘 New Post – Test Cases

## 🟢 TC01 – Create new post with image and verify it in the profile

Type: Positive
Goal: Ensure that a user can create a post with an image and verify that it appears correctly in their profile.

Steps to Reproduce:

1. Navigate to New Post page.

2. Upload a valid image from test-data/.

3. Enter a valid caption in the text field.

4. Click “Create post” button.

5. Click on the newly uploaded image in the posts list.

Expected Result:

- Post appears in the user profile with the correct caption and image.

- Clicking the image opens it properly (full view or modal) with no errors.

- The post matches what was submitted in the New Post form.

Actual Result:

- Post is visible in the profile list.

- Image opens correctly when clicked.

- Description of the image match the submitted data.

## 🔴 TC02 – New Post Fails: Missing required image

Type: Negative
Goal: Ensure post creation fails if a required upload (e.g. image ) is missing.

Steps to Reproduce:

1. Navigate to New Post page.

2. Fill the caption field.

3. Click “Create a post”.

Expected Result:

- Inline validation or server error appears: "Please upload an image!".

- Post is not created.

Actual Result:

- Form shows error message; The user is still in the new post page form.

## 🔴 TC03 – New Post Fails: Missing Required Caption

Type: Negative
Goal: Ensure post creation fails if a required field (e.g., caption) is missing.

Steps to Reproduce:

1. Navigate to New Post page.

2. Upload a image.

3. Skip the caption.

4. Click “Create a post”.

Expected Result:

- Form shows error message: “Please enter a caption”.

- Post is not created.

Actual Result:

- Form shows error message; The user is still in the new post page form.
