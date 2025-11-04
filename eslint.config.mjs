import globals from "globals";
import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended, 
  prettierConfig, 

  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node, 
      }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "on",      
      "eqeqeq": "error"      
    }
  },
  {
    ignores: ["node_modules/", "dist/"]
  }
];