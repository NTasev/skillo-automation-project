# 📘 Logout – Test Case

## 🟢 TC01 – Successful logout with valid user

Type: Positive
Goal: Verify that a logged-in user can successfully log out.

Steps to Reproduce:

1. Log in with a valid username and password.

2. Navigate to the homepage.

3. Click the “Logout” button.

Expected Result:

User is logged out successfully. Logout message appear.

Redirected to the login page.

User session is cleared (no user icon visible, cannot access protected pages).

Actual Result:

User is logged out. Logout message appear.

Redirected to login page.

User menu is no longer visible; attempts to access protected routes redirect back to login.
