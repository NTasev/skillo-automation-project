# Skillo Social Media - Test Automation Suite

## 📖 Project Overview

This project is an automated test suite for the Skillo Social Media Platform.  
It covers core functionalities such as user registration, login, logout, and post creation, using Playwright and the Page Object Model (POM) for maintainable and scalable test automation.

## 🎯 Project Purpose

The automation suite is designed to:

- Ensure core functionalities work as expected.
- Validate positive and negative scenarios for registration, login, logout, and post creation.
- Serve as a professional example of automated testing with Playwright.

## 🛠️ Technologies Used

- JavaScript (ES6)
- Playwright Test Framework
- Node.js
- ESLint
- Git/GitHub
- JSON for test data
- VS Code

## 📋 Prerequisites

- Node.js >= 18.x
- NPM >= 9.x
- Playwright installed (`npm install -D @playwright/test`)
- Access to the application under test: [http://training.skillo-bg.com:4300/posts/all]

## 🚀 Installation & Setup

1. Clone the repository:
   ```bash
   git clone <https://github.com/NTasev/skillo-automation-project.git>
   ```
   npm install
   npx playwright install

## ▶️ Running Tests

npx playwright test
npx playwright test tests/<fileTestName.spec.js>
npx playwright test tests/<fileTestName.spec.js> --headed/ --debug/ --project=

## 📁 Project Structure

skillo-automation-project/
│
├── pages/ # Page Object Model classes
├── tests/ # Test specs
│ ├── fixtures/ # Custom fixtures
│ ├── registration.spec.js
│ ├── login.spec.js
│ ├── logout.spec.js
│ └── newPost.spec.js
├── test-data/ # Test data (JSON, images)
├── .gitignore
├── eslint.config.mjs
├── package.json
├── playwright.config.js
└── README.md

## 🧪 Test Scenarios

### Registration Tests

Registration Tests

🟢 TC01 – Successful Registration
Verify successful registration with valid and unique data.
Steps: Navigate → Fill all fields → Sign up → Redirect to homepage.
Expected: Account created, user logged in.
Actual: User created and logged in successfully.

🔴 TC02 – Registration Fails: Weak or Invalid Password
Verify password rules.
Steps: Fill password not meeting criteria → Sign up.
Expected: Inline error, registration blocked.
Actual: Form displays error, no account created.

🔴 TC03 – Registration Fails: Passwords Do Not Match
Verify password confirmation.
Steps: Enter different passwords → Sign up.
Expected: “Passwords do not match” error, registration blocked.
Actual: Error appears, account not created.

🔴 TC04 – Registration Fails: Missing Username
Verify required username field.
Steps: Leave username empty → Fill other fields → Sign up.
Expected: “This field is required”, registration blocked.
Actual: Inline validation prevents submission.

### Login Tests

🟢 TC01 – Successful Login
Verify login with valid credentials.
Steps: Navigate → Enter username/email + password → Sign in.
Expected: User logged in, redirected to homepage.
Actual: Login successful, redirected.

🔴 TC02 – Login Fails: Wrong Password
Verify login blocked for incorrect password.
Steps: Enter valid username + wrong password → Sign in.
Expected: “Wrong username or password”, login blocked.
Actual: Error displayed, user remains on login page.

🔴 TC03 – Login Fails: Unregistered User
Verify login blocked for unknown user.
Steps: Enter unregistered username → Sign in.
Expected: “User does not exist”, login blocked.
Actual: Error displayed, login prevented.

🔴 TC04 – Login Fails: Empty Credentials
Verify both fields are required.
Steps: Leave username and password empty → Sign in.
Expected: “Username and password are required”, login blocked.
Actual: Inline/server error shown, login prevented.

### Logout Tests

🟢 TC01 – Successful Logout
Verify logged-in user can logout.
Steps: Login → Navigate to profile/settings → Click Logout.
Expected: Redirected to public page, session cleared.
Actual: User logged out, redirected, menu not visible.

### New Post Tests

🟢 TC01 – Create New Post with Image Upload
Verify post creation with image.
Steps: Navigate → Upload valid image → Enter caption → Create post.
Expected: Post appears with correct image.
Actual: Post created and visible.

🟢 TC02 – Create New Post with Image and Verify in Profile
Verify image post appears correctly in user profile.
Steps: Upload image → Enter caption → Create post → Click image in posts list.
Expected: Image opens correctly, caption matches.
Actual: Post visible in profile, image opens correctly.

🔴 TC03 – New Post Fails: Missing Required Field
Verify post creation fails when caption is empty.
Steps: Leave caption empty → Create post.
Expected: Inline/server error, post not created.
Actual: Error shown, post blocked.

## 📊 Test Coverage

- Total test cases: 12
- Positive tests: 5
- Negative tests: 7

## 🏗️ Architecture

All pages use Page Object Model (POM) for maintainability.

Common actions and locators are defined in BasePage.js.

Fixtures handle login sessions and reusable setups.

Tests are independent and data-driven where applicable.

## 🐛 Known Issues

(Optional) List any known issues or limitations.

## 🔮 Future Improvements

Add full E2E workflow combining registration → login → post → logout.

Add cross-browser screenshots comparison.

Add additional negative scenarios for image upload limits.

## 👤 Author

Nikolay Emilov Tasev
[https://github.com/NTasev]

## 📄 License

(Optional) MIT License or mention it's for educational purposes
