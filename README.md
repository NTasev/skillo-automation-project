# Skillo Social Media - Test Automation Suite

## 📖 Project Overview

This is an automated test suite for the Skillo Social Media Platform.
It covers core functionalities such as user registration, login, logout, and post creation using Playwright and the Page Object Model (POM) for maintainable and scalable test automation.

## 🎯 Project Purpose

The automation suite is designed to:

- Ensure core functionalities work as expected.
- Validate both positive and negative test scenarios.
- Serve as a professional example of automated testing using Playwright.
- Demonstrate independent, reusable, and maintainable test design.

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

git clone [https://github.com/NTasev/skillo-automation-project.git]
cd skillo-automation-project
npm install
npx playwright install

## ▶️ Running Tests

npx playwright test

npx playwright test tests/[fileTestName].spec.js

npx playwright test tests/[fileTestName].spec.js --headed
npx playwright test tests/[fileTestName].spec.js --debug
npx playwright test tests/[fileTestName].spec.js --project=chromium

## 📁 Project Structure

skillo-automation-project/
│
├── pages/ # Page Object Model (POM) classes
├── tests/ # Test specs
│ ├── fixtures/
│ │ ├── base.js
│ │ └── auth.js
│ ├── registration.spec.js
│ ├── login.spec.js
│ ├── logout.spec.js
│ └── newPost.spec.js
├── test-data/ # Test data (registrationData.js, JSON, images)
├── .gitignore
├── eslint.config.mjs
├── package.json
├── playwright.config.js
└── README.md

## 🧪 Test Scenarios

| TC      | Description                | Steps                                            | Expected                               | Actual                       |
| ------- | -------------------------- | ------------------------------------------------ | -------------------------------------- | ---------------------------- |
| ✅ TC01 | Login with Username        | Navigate → Enter credentials → Sign in           | User logged in, redirected             | Works as expected            |
| ✅ TC02 | Login with Email           | Enter email → Sign in                            | User logged in, redirected             | Works as expected            |
| 🔴 TC03 | Empty Password             | Enter username → Leave password empty → Sign in  | Error shown                            | Login prevented              |
| 🔴 TC04 | Empty Username             | Leave username empty → Enter password → Sign in  | Validation error                       | "Wrong username or password" |
|         |                            |                                                  |                                        |                              |
| ------- | -------------------        | -----------------------------------------------  | --------------------------             | ---------------------------- |
| ✅ TC01 | Login with Username        | Navigate → Enter credentials → Sign in           | User logged in, redirected             | Works as expected            |
| ✅ TC02 | Login with Email           | Enter email → Sign in                            | User logged in, redirected             | Works as expected            |
| 🔴 TC03 | Empty Password             | Enter username → Leave password empty → Sign in  | Error shown                            | Login prevented              |
| 🔴 TC04 | Empty Username             | Leave username empty → Enter password → Sign in  | Validation error                       | "Wrong username or password" |
| 🔴 TC05 | Unregistered User          | Enter unregistered username → Sign in            | Error shown                            | Login blocked                |
|         |                            |                                                  |                                        |                              |
| ------  | -----------------          | --------------------------                       | ------------------------------------   | -----------------            |
| ✅ TC01 | Successful Logout          | Login → Open menu → Logout                       | Session cleared; redirected to login   | Works as expected            |
|         |                            |                                                  |                                        |                              |
| ------- | -------------------------- | ------------------------------------------------ | -------------------------------------- | ---------------------        |
| ✅ TC01 | Create New Post with Image | Upload image → Add caption → Create post         | Post appears in feed/profile           | Post created; visible        |
| 🔴 TC02 | Missing Image              | Enter caption → Create post                      | Error shown: "Please upload an image!" | Error displayed              |
| 🔴 TC03 | Missing Caption            | Upload image → Leave caption empty → Create post | Inline error; post blocked             | Error displayed              |

## 📊 Test Coverage

- Total test cases: 13
- Positive tests: 6
- Negative tests: 7

## 🏗️ Architecture

- Page Object Model (POM) for maintainability.
- Common actions and locators defined in every POM class.
- Fixtures handle reusable setups and login sessions.
- Tests are independent and data-driven where applicable.
- Different data testing approaches for different scenarios.
- UI cleanup after successfull post creation.

## 🐛 Known Issues

- Unpredictable fails with firefox/nighty browser.

## 🔮 Future Improvements

Implement full E2E workflow: registration → login → post → logout.

Add negative tests for image upload limits (size, format).

Expand cross-browser/device testing in playwright.config.js.

Include API test coverage for key endpoints and post deletes.

## 👤 Author

Nikolay Emilov Tasev
[https://github.com/NTasev]

## 📄 License

This project is for educational purposes only.
