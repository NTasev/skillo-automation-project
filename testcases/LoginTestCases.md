# 📘 Login – Test Cases

## 🟢 TC01 – Successful Login with Valid Username and Password

Type: Positive
Goal: Verify that a registered user can log in successfully.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a valid username/email and password.

3. Click "Remember me" (optional).

4. Click “Sign in”.

5. Verify user profile.

Expected Result:

User is successfully logged in. Message "Successful login!" appear.

Redirected to homepage.

Actual Result:

User is logged in successfully, redirected to homepage.

## 🟢 TC02 – Successful Login with Valid Email and Password

Type: Positive
Goal: Verify that a registered user can log in successfully using their email address.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a valid email and corresponding password.

3. Click “Remember me” (optional).

4. Click “Sign in”.

5. Verify user profile.

Expected Result:

User is successfully logged in.

Message "Successful login!" appears.

User is redirected to the homepage.

Actual Result:

User is logged in successfully (to be filled after test execution).

## 🔴 TC03 - Login Fails: Empty Password Field

Type: Negative
Goal: Ensure login is blocked when the password field is empty.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a valid username.

3. Leave password field empty.

4. Click “Sign in”.

Expected Result:

User remains on the Login page with empty password field.

Actual Result:

User cannot log in and stays on the Login page.

## 🔴 TC04 – Login Fails: Empty Username Field

Type: Negative
Goal: Validate that login requires both username and password.

Steps to Reproduce:

1. Navigate to the Login page.

2. Leave Username/Password empty.

3. Click “Sign in”.

Expected Result:

Server message shows: “Username and password are required.”

Login is blocked.

Actual Result:

Form shows an error banner: “Wrong username or password”.
User stays on the login page; no request is sent.

## 🔴 TC05 – Login Fails: Unregistered User

Type: Negative
Goal: Ensure login fails if the user does not exist in the system.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a username that does not exist.

3. Enter any password.

4. Click “Sign in”.

Expected Result:

Server displays “Wrong username or password”.

Login is blocked.

Actual Result

Server displays “Wrong username or password”. User remains on the login page; cannot log in.
