module.exports = {
  env: {
    node: true,
    es2022: true
  },
  extends: [
    "eslint:recommended"
  ],
  overrides: [
    {
      files: ["src/*.ts", "test/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint"
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
      }
    },
    {
      files: ["dist/*.d.ts"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint"
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
      ],
      parserOptions: {
        project: "tsconfig.dist.json",
        tsconfigRootDir: __dirname,
      }
    }
  ],
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2, {
      SwitchCase: 1
    }],
    quotes: ["error", "double"]
  },
  root: true
};
