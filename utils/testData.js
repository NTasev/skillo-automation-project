export const validUsers = [
  {
    username: "TasevNikolay",
    email: "nikolay@example.com",
    password: "Password123!",
    description: "valid username and password",
  },

  {
    username: "NikolayTasev",
    email: "tasev@example.com",
    password: "Password123!",
    description: "valid email and password",
  },
];

export const invalidUsers = [
  {
    username: "userEmptyPassword",
    email: "user@example.com",
    password: "",
    description: "empty password field",
  },
  {
    username: "",
    email: "empty@example.com",
    password: "emptyPassword123",
    description: "empty username field",
  },
  {
    username: "unregisteredUser",
    email: "unregistered@example.com",
    password: "unregisteredPassword123",
    description: "unregistered user",
  },
];
