// Invalid registration data for negative test cases
export const invalidData = [
  {
    testName: "password is invalid",
    username: "KungFuPanda",
    email: "test@example.com",
    date: "2000-01-01",
    password: "password", // invalid
    confirmPassword: "password",
    info: "My password is too weak",
    expectedFeedback: "Must contain digit and uppercase letter!",
  },
  {
    testName: "password do not match",
    username: "BuggyTheBug",
    email: "test@example.com",
    date: "2000-01-01",
    password: "Password123!", // valid
    confirmPassword: "password123", // invalid
    info: "My passwords do not match",
    expectedFeedback: "Passwords do not match!",
  },
  {
    testName: "username is missing",
    username: "", //invalid
    email: "test@example.com",
    date: "2000-01-01",
    password: "Password123!",
    confirmPassword: "Password123!",
    info: "My username is missing",
    expectedFeedback: "This field is required!",
  },
];
