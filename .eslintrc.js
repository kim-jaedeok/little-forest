module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["react", "react-hooks"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  settings: {
    react: {
      version: "17.0.2",
    },
  },
  rules: {
    "no-console": "warn",
    semi: [
      "warn",
      "always",
      {
        omitLastInOneLineBlock: true,
      },
    ],
    "semi-style": ["warn", "last"],
    quotes: ["warn", "double"],
    indent: [
      "warn",
      2,
      {
        SwitchCase: 1,
      },
    ],
    "no-multi-spaces": "warn",
    "no-multiple-empty-lines": [
      "warn",
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    "space-infix-ops": "warn",
    "comma-spacing": "warn",
    "block-spacing": "warn",
    "semi-spacing": "warn",
    "object-curly-spacing": ["warn", "always"],
    "key-spacing": "warn",
    "eol-last": "warn",
    "no-undef": "warn",
  },
};
