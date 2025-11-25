export const validUsers = [
  {
    username: "TasevNikolay",
    email: "nikolay@example.com",
    password: "Password123!",
    description: "valid username and password",
  },
  {
    username: "TasevNikolay",
    email: "nikolay@example.com",
    password: "Password123!",
    description: "valid email and password",
  },
];

export const invalidUsers = [
  {
    username: "user@example.com",
    email: "user@example.com",
    password: "",
    description: "empty password field",
  },
  {
    username: "unregisteredUser",
    email: "unregistered@example.com",
    password: "unregisteredPassword123",
    description: "unregistered user",
  },
  {
    username: "",
    email: "empty@example.com",
    password: "emptyPassword123",
    description: "empty username field",
  },
];
