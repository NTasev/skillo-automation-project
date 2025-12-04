// Generate a random username
export function generateUsername() {
  return `user${Math.floor(Math.random() * 100000)}`;
}
// Generate a random email address
export function generateEmail() {
  return `user${Math.floor(Math.random() * 100000)}@test.com`;
}

// Math.floor to ensure number is an integer and math.random to get a random number //
