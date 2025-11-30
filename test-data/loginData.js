// Positive users: valid credentials
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

// Negative users: invalid credentials
export const emptyFieldUsers = [
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
    username: "",
    email: "empty@example.com",
    password: "",
    description: "both username and password empty",
  },
];

// Unregistered users: credentials not in the system
export const unregisteredUsers = [
  {
    username: "unregisteredUser",
    email: "unregistered@example.com",
    password: "unregisteredPassword123",
    description: "unregistered user",
  },
  {
    username: "ghostUser",
    email: "ghost@example.com",
    password: "GhostPassword123",
    description: "another unregistered user",
  },
];
