// --- 1. POSITIVE USER: Valid Credentials ---
export const validUser = [
  {
    username: "TasevNikolay",
    email: "nikolay@example.com",
    password: "Password123!",
    description: "valid user with username and email",
  },

  {
    username: "NikolayTasev",
    email: "tasev@example.com",
    password: "Password123!",
    expectedUsername: "NikolayTasev",
    description: "valid email with different username",
  },
];
