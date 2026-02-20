import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    {
        ignores: [".next/**", "node_modules/**", "dist/**", "src/generated/**", "src/App.jsx", "src/main.jsx", "vite.config.js", "cloud/**", "scripts/**"],
    },
    ...compat.extends("next/core-web-vitals"),
    // ...compat.extends("plugin:@typescript-eslint/recommended"),
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            "unused-imports": unusedImports,
        },
        rules: {
            // Re-apply critical rules
            "@next/next/no-html-link-for-pages": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^(e|err|_.*)$"
                }
            ],
            "react-hooks/exhaustive-deps": "warn",
            "react/no-unescaped-entities": "off",
            "react/display-name": "off",
            "react/forbid-dom-props": "off",
            "react/forbid-component-props": "off",
            "@typescript-eslint/no-require-imports": "off",
            "@typescript-eslint/no-explicit-any": "off"
        }
    }
];
