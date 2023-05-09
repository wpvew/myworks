module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['prettier'],
  extends: 'airbnb-base',
  // overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    // quotes: ['error', 'single'],
    'no-mixed-operators': 0,
    // 'max-classes-per-file': ['error', 2],
    camelcase: ['error', { ignoreDestructuring: true }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        jsxSingleQuote: true,
        printWidth: 100,
      },
    ],
  },
  resolve: { extensions: ['.js'] },
};
