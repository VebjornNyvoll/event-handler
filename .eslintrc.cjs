/* eslint-env node */

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: '.eslintrc.cjs',

  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json', 'tsconfig.node.json', 'tsconfig.eslint.json'],
    tsconfigRootDir: __dirname,
  },
};
