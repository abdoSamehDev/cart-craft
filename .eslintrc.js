module.exports = {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      project: ["./tsconfig.json", "./tsconfig.node.json"],
      tsconfigRootDir: __dirname,
    },
    extends: [
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
    ],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Your custom rules here
    },
  };
  