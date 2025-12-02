# Skillo Social Media - Test Automation Suite

## 📖 Project Overview

This project is an automated test suite for the Skillo Social Media Platform.  
It covers core functionalities such as user registration, login, logout, and post creation, using Playwright and the Page Object Model (POM) for maintainable and scalable test automation.

## 🎯 Project Purpose

The automation suite is designed to:

- Ensure core functionalities work as expected.
- Validate positive and negative test scenarios for registration, login, logout, and post creation.
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
- Access to the application under test: [http://training.skillo-bg.com:4300]

## 🚀 Installation & Setup

1. Clone the repository:
   `bash
   git clone <https://github.com/NTasev/skillo-automation-project.git>
   ``
   npm install
   npx playwright install

## ▶️ Running Tests

npx playwright test
npx playwright test tests/<fileTestName.spec.js>
npx playwright test tests/<fileTestName.spec.js> --headed/ --debug/ --project=[chromium/firefox/webkit]

## 📁 Project Structure

skillo-automation-project/
│
├── pages/ # Page Object Model classes
├── tests/ # Test specs
│ ├── fixtures/
| | |-base.js
| | |-auth.js
│ ├── registration.spec.js
│ ├── login.spec.js
│ ├── logout.spec.js
│ └── newPost.spec.js
├── test-data/ # Test data (loginData.js, registrationData.js, JSON, images)
├── .gitignore
├── eslint.config.mjs
├── package.json
├── playwright.config.js
└── README.md

## 🧪 Test Scenarios

## Registration Tests

🟢 TC01 – Successful Registration
Verify user can register with valid and unique data.
Steps: Navigate → Fill all fields → Sign up → Redirect.
Expected: Account created, user logged in.
Actual: Success; redirected to homepage.

🔴 TC02 – Registration Fails: Weak or Invalid Password
Verify password validation rules.
Steps: Enter weak password → Sign up.
Expected: Inline error, registration blocked.
Actual: Error displayed.

🔴 TC03 – Registration Fails: Passwords Do Not Match
Verify password confirmation validation.
Steps: Enter mismatched passwords → Sign up.
Expected: “Passwords do not match.”
Actual: Error displayed.

🔴 TC04 – Registration Fails: Missing Username
Verify username is required.
Steps: Leave username empty → Fill rest → Sign up.
Expected: Required field validation.
Actual: Inline validation prevents submission.

## Login Tests

🟢 TC01 – Successful Login (Username)
Verify login with valid username + password.
Steps: Navigate → Enter credentials → Sign in.
Expected: User logged in and redirected.
Actual: Successful login.

🟢 TC02 – Successful Login (Email)
Verify login with email + password.
Steps: Enter email → Sign in.
Expected: Login successful.
Actual: Works as expected.

🔴 TC03 – Login Fails: Empty Password
Verify login blocked if password missing.
Steps: Enter username → Leave password empty → Sign in.
Expected: Error shown.
Actual: Login prevented.

🔴 TC04 – Login Fails: Empty Username
Verify username is required.
Steps: Leave username empty → Enter password → Sign in.
Expected: Validation error.
Actual: Error: “Wrong username or password.”

🔴 TC05 – Login Fails: Unregistered User
Verify login blocked for unknown user.
Steps: Enter unregistered username → Sign in.
Expected: Error shown.
Actual: Login blocked.

## Logout Tests

🟢 TC01 – Successful Logout
Verify that a logged-in user can log out.
Steps: Login → Open menu → Logout.
Expected: Session cleared, redirected to Login.
Actual: User logged out.

## New Post Tests

🟢 TC01 – Create New Post with Image
Verify successful post creation with image.
Steps: Upload image → Add caption → Create post.
Expected: Post appears in feed/profile.
Actual: Post created; visible.

🔴 TC02 – New Post Fails: Missing Image
Verify that image is required.
Steps: Enter caption → Create post.
Expected: Error: “Please upload an image!”
Actual: Error shown.

🔴 TC03 – New Post Fails: Missing Caption
Verify caption is required.
Steps: Upload image → Leave caption empty → Create post.
Expected: Inline error.
Actual: Post not created.

## 📊 Test Coverage

- Total test cases: 13
- Positive tests: 6
- Negative tests: 7

## 🏗️ Architecture

All pages use Page Object Model (POM) for maintainability.

Common actions and locators are defined in every POM.

Fixtures handle login sessions and reusable setups.

Tests are independent and data-driven where applicable.

## 🐛 Known Issues

Common firefox/nighty error behavior that can be flaky or even fail.

Different locators adapted for the projects needs working with Angular framework.

## 🔮 Future Improvements

Add full E2E workflow combining registration → login → post → logout.

Add cross-browser screenshots comparison.

Add additional negative scenarios for image upload limits.

## 👤 Author

Nikolay Emilov Tasev
[https://github.com/NTasev]

## 📄 License

(Optional) MIT License or mention it's for educational purposes
