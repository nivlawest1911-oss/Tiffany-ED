import { dirname } from "path";
import { fileURLToPath } from "url";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextConfig from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        // 1. Explicitly ignore build artifacts and legacy Vite files
        ignores: [".next/**", "node_modules/**", "dist/**", "src/App.jsx", "src/main.jsx", "vite.config.js", "cloud/**", "scripts/**"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    js.configs.recommended,
    // 2. Add Next.js configuration (it is already a flat config array)
    ...nextConfig,
    {
        // 3. Project-specific overrides for EdIntel
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            "unused-imports": unusedImports,
        },
        rules: {
            "@next/next/no-html-link-for-pages": "error",

            // --- Overhaul Fixes ---
            "no-unused-vars": "off", // Handled by TS and Plugin
            "@typescript-eslint/no-unused-vars": "off", // Handled by Plugin 'unused-imports' usually, or we just relax it completely for the overhaul

            "unused-imports/no-unused-imports": "error", // Auto-remove imports
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

            "react-hooks/exhaustive-deps": "warn", // Don't break build on hook deps
            "react/no-unescaped-entities": "off",
            "react/display-name": "off",
        }
    }
];
