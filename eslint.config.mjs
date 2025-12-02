import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import playwright from "eslint-plugin-playwright";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    languageOptions: {
      // ✅ Fix for Modern Syntax Errors (Parsing error: Unexpected token assert)
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  {
    files: ["**/*.spec.js"],
    plugins: {
      playwright,
    },
    extends: [playwright.configs["recommended"]],
    rules: {},
  },
]);
