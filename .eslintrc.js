module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  // We use next/core-web-vitals because it is built into Vercel and won't fail the build
  extends: [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};