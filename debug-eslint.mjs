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

const eslintConfig = tseslint.config(
    {
        ignores: [".next/**", "node_modules/**", "dist/**", "src/generated/**", "src/App.jsx", "src/main.jsx", "vite.config.js", "cloud/**", "scripts/**", "original_delegate.tsx", "next-env.d.ts"],
    },
    ...compat.extends("next/core-web-vitals"),
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
            // My rules
        }
    }
);

console.log("Config Length:", eslintConfig.length);
eslintConfig.forEach((cfg, i) => {
    if (!cfg || typeof cfg !== 'object') {
        console.error(`Invalid config at index ${i}:`, cfg);
    } else {
        // console.log(`Config at index ${i} looks okay (keys: ${Object.keys(cfg)})`);
    }
});
