module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-var': 'error',
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 120,
      },
    ],
  },
};
