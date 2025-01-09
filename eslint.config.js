import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import typescriptEslintParser from "@typescript-eslint/parser";
import PluginImport from "eslint-plugin-import";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier, eslintPluginPrettierRecommended],
    files: ["**/*.{ts,tsx}"],
    ignores: ["dist"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: typescriptEslintParser
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier: eslintPluginPrettier,
      "@typescript-eslint": typescriptEslintPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off"
    },
    settings: {
      "import/resolver": {
        ...PluginImport.configs.typescript.settings["import/resolver"],
        typescript: {
          project: ["tsconfig.json"]
        }
      }
    }
  }
);
