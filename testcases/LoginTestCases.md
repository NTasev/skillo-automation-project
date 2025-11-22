# 📘 Login – Test Cases

# 🟢 TC01 – Successful Login

Type: Positive
Goal: Verify that a registered user can log in successfully.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a valid username/email and password.

3. Click "Remember me",

4. Click “Sign in”.

Expected Result:

User is successfully logged in. Message "Successful login" appear.

Redirected to homepage.

Actual Result:

User is logged in successfully, redirected to homepage.

# 🔴 TC02 – Login Fails: Wrong Password

Type: Negative
Goal: Ensure login is blocked when the password is incorrect.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a valid username.

3. Enter an incorrect password.

4. Click “Sign in”.

Expected Result:

Server shows an error message: “Wrong username or password”.

User remains on the Login page with empty fields.

Actual Result:

Server displays “Wrong username or password”. User cannot log in and stays on the Login page.

# 🔴 TC03 – Login Fails: Unregistered User

Type: Negative
Goal: Ensure login fails if the user does not exist in the system.

Steps to Reproduce:

1. Navigate to the Login page.

2. Enter a username that does not exist.

3. Enter any password.

4. Click “Sign in”.

Expected Result:

Server returns error: “User does not exist.”

Login is blocked.

Actual Result

Server displays “Wrong username or password”. User remains on the login page; cannot log in.

# 🔴 TC04 – Login Fails: Empty Credentials

Type: Negative
Goal: Validate that login requires both username and password.

Steps to Reproduce:

1. Navigate to the Login page.

2. Leave Username and Password empty.

3. Click “Sign in”.

Expected Result:

Inline validation or server message shows: “Username and password are required.”

Login is blocked.

Actual Result:

Form shows an error banner or inline message: “Wrong username or password”.
User stays on the login page; no request is sent.
