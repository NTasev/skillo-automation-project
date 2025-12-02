import { test, expect } from "./fixtures/auth.js";

test("✅TC01.Positive: Logout should pass with valid login and redirects to login page", async ({
  authUser,
  homePage,
}) => {
  // Ensure home page is loaded
  await homePage.isLoaded();
  await homePage.logout();

  // Assertions
  const logoutMessage = authUser.getByRole("alertdialog", {
    name: "Successful logout!",
  });

  await expect(logoutMessage).toBeVisible();
  await expect(logoutMessage).toHaveText("Successful logout!");
  await expect(authUser).toHaveURL("/users/login");
});
