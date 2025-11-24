export function generateValidUsername(base = "user") {
  // produce: user-<random 5 digits> (letters + digits, starts with letter)
  const n = Math.floor(Math.random() * 90000) + 10000;
  return `${base}${n}`; // e.g. user12345
}

export function generateValidEmail(base = "user") {
  // use a safe domain and no unusual chars
  const n = Math.floor(Math.random() * 90000) + 10000;
  return `${base}${n}@mail.com`;
}

export function generateRandomDate() {
  const year = Math.floor(Math.random() * (2005 - 1980 + 1)) + 1980;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function generateRandomPublicInfo() {
  const hobbies = ["reading", "football", "traveling", "coding", "painting"];
  const hobby = hobbies[Math.floor(Math.random() * hobbies.length)];
  return `I love ${hobby}`;
}
