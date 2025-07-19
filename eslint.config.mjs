import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    rules: {
      // Base ESLint rules
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-unused-vars": "off", // TypeScript handles this
      "no-undef": "off", // TypeScript handles this

      // React specific rules
      "react/prop-types": "off", // TypeScript handles this
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      "react/display-name": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-filename-extension": "off",
      "react/jsx-props-no-spreading": "off",
      "react/jsx-no-constructed-context-values": "off",
      "react/jsx-no-comment-textnodes": "off",

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],

      // Import rules
      "import/no-anonymous-default-export": "off",
    },
  },
];

export default eslintConfig;
