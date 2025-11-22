# 📘 Logout – Test Case

=======================

# 🟢 TC01 – Successful Logout

Type: Positive
Goal: Verify that a logged-in user can successfully log out and session is cleared.

Steps to Reproduce:

1. Log in with a valid username and password.

2. Navigate to the user profile menu or settings.

3. Click the “Logout” button.

Expected Result:

User is logged out successfully.

Redirected to the public/home page.

User session is cleared (no user icon visible, cannot access protected pages).

Actual Result:

User is logged out.

Redirected to public/home page.

User menu is no longer visible; attempts to access protected routes redirect back to login.
