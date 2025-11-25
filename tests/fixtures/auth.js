import { test as base } from "../fixtures/base.js";
import { validUsers, invalidUsers } from "../authData.js";

export const test = base.extend({
  // eslint-disable-next-line no-empty-pattern
  authData: async ({}, use) => {
    await use({ validUsers, invalidUsers });
  },
});

export { expect } from "@playwright/test";
