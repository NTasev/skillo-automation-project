import { test, expect } from "./fixtures/auth.js";
import { HomePage } from "../pages/HomePage.js";

test("✅TC01: Successful logout after valid login and redirects to login page", async ({
  authUser,
}) => {
  const homePage = new HomePage(authUser);

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
