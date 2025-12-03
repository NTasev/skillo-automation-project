# 📘 Registration – Test Cases

## 🟢 TC01 – Successful Registration

Type: Positive
Goal: Verify successful registration with valid and unique data.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Enter valid unique username, email, password, birth date, and public info.

3. Click “Sign in”.

Expected Result:

User account is successfully created.

App redirects to homepage and user appears as logged-in.

Actual Result:

User is created successfully. App redirects to homepage.

## 🔴 TC02 – Registration Fails: Weak or Invalid Password

Type: Negative
Goal: Validate password rules.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Enter a password that doesn’t meet required criteria (e.g., digit and uppercase letter!).

3. Fill other fields with valid data.

4. Click “Sign in”.

Expected Result:

Password field displays error (e.g., “Must contain digit and uppercase letter!”)

Registration is blocked.

Actual Result:

Form displays error below password field. Registration is prevented and no account is created.

## 🔴 TC03 – Registration Fails: Passwords Do Not Match

Type: Negative
Goal: Ensure the system rejects registration when the password and confirmation password do not match.

Steps to Reproduce:

1. Navigate to the Registration page.

2. Fill other fields with valid data.

3. Enter a valid password in the Password field (e.g., Password123!).

4. Enter a different password in the Confirm Password field (e.g., password1234!).

5. Click “Sign in”.

Expected Result:

Server or form validation displays an error: “Passwords do not match.”

Registration is blocked.

Actual Result:

Error message appears: “Passwords do not match.”

User remains on registration page; account is not created.

## 🔴 TC04 – Registration Fails: Missing Username

Type: Negative
Goal: Validate that the username field is required.

Steps to Reproduce

1. Navigate to the Registration page.

2. Leave the Username field empty.

3. Fill all other required fields.

4. Click “Sign in”.

Expected Result:

Error message appears: “This field is required.”

Form does not submit.

Actual Result:

Inline validation appears: “This field is required.” Submit is blocked.
