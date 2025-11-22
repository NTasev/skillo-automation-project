# 📘 New Post – Test Cases

==========================

# 🟢 TC01 – Create New Post with Image Upload

Type: Positive
Goal: Verify that a user can create a post with an image.

Steps to Reproduce:

1. Navigate to New Post page.

2. Upload a valid image (3400_3_02.jpg) from test-data/.

3. Enter post caption.

4. Make the post public.

5. Click the "Create post" button.

Expected Result:

Post is created successfully with image and message appear: "Post created!"

Image is displayed correctly in the posts list.

Actual Result:

Post appears in the posts list with correct uploaded image.

# 🟢 TC02 – Create New Post with Image and Verify in Profile

Type: Positive
Goal: Ensure that a user can create a post with an image and verify that it appears correctly in their profile.

Steps to Reproduce:

1. Navigate to New Post page.

2. Upload a valid image (3400_3_02.jpg) from test-data/.

3. Enter a valid caption in the text field.

4. Click “Create post” button.

5. Click on the newly uploaded image in the posts list.

Expected Result:

Post appears in the user profile with the correct caption and image.

Clicking the image opens it properly (full view or modal) with no errors.

The post matches what was submitted in the New Post form.

Actual Result:

Post is visible in the profile list.

Image opens correctly when clicked.

Description of the image match the submitted data.

# 🔴 TC03 – New Post Fails: Missing Required Image

Type: Negative
Goal: Ensure post creation fails if a required field (e.g., caption) is missing.

Steps to Reproduce:

1. Navigate to New Post page.

2. Fill the caption field.

3. Click “Create a post”.

Expected Result:

Inline validation or server error appears: “Please upload image”.

Post is not created.

Actual Result:

Form shows error message; post does not appear in the posts list.
