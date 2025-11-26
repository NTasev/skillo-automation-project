export function generateUsername() {
  return `user${Math.floor(Math.random() * 100000)}`;
}

export function generateEmail() {
  return `user${Math.floor(Math.random() * 100000)}@test.com`;
}
