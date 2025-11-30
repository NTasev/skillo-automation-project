// Generate a random username
export function generateUsername() {
  return `user${Math.floor(Math.random() * 100000)}`;
}
// Generate a random email address
export function generateEmail() {
  return `user${Math.floor(Math.random() * 100000)}@test.com`;
}
