# 📘 Registration – Test Cases

## 🟢 TC01 – Successful Registration

Type: Positive
Goal: Verify successful registration with valid and unique data.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Enter valid unique username, email, password, birth date, and public info.

3. Click “Sign in”.

Expected Result:

- User account is created.

- App redirects to homepage.

- User appears as logged in.

App redirects to homepage and user appears as logged-in.

Actual Result:

- User is created successfully.

## 🔴 TC02 – Registration Fails: Weak or Invalid Password

Type: Negative
Goal: Validate password rules.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Fill in all fields with valid data except password (use weak/invalid password).

3. Assert that the “Sign in” button is disabled.

4. Optionally, check the inline error message for password rules.

Expected Result:

- Password field displays error (e.g., “Must contain digit and uppercase letter!”)

- Registration is blocked.

- Button remains disabled.

Actual Result:

- Form displays password error; submission is prevented.

## 🔴 TC03 – Registration Fails: Passwords Do Not Match

Type: Negative
Goal: Ensure the system rejects registration when the password and confirmation password do not match.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Fill other fields with valid data.

3. Enter mismatching passwords.

4. Assert that the “Sign in” button is disabled.

5. Check that the error “Passwords do not match” appears.

Expected Result:

- Form shows error; account is not created.

- Button remains disabled.

## 🔴 TC04 – Registration Fails: Missing Username

Type: Negative
Goal: Validate that the username field is required.

Steps to Reproduce

1. Navigate to the Registration page.

2. Leave the Username field empty.

3. Fill all other required fields.

4. Check for inline error: “This field is required.”

Expected Result:

- Registration is blocked.

- Button remains disabled.
