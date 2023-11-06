module.exports = {
  env: {
    node: true,
    es2022: true
  },
  plugins: [
    "jsdoc"
  ],
  extends: [
    "eslint:recommended",
    "plugin:jsdoc/recommended"
  ],
  overrides: [
    {
      files: ["src/*.ts", "test/*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint",
        "jsdoc"
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jsdoc/recommended"
      ],
      parserOptions: {
        project: "tsconfig.test.json",
        tsconfigRootDir: __dirname,
      }
    },
    {
      files: ["dist/*.d.ts"],
      parser: "@typescript-eslint/parser",
      plugins: [
        "@typescript-eslint",
        "jsdoc"
      ],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:jsdoc/recommended"
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
    indent: ["warn", 2, {
      SwitchCase: 1
    }],
    quotes: ["warn", "double"],
    "no-trailing-spaces": "warn"
  },
  root: true
};
