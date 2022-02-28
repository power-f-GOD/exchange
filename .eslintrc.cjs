module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['svelte3', '@typescript-eslint'],
  ignorePatterns: ['*.cjs', 'node_modules/*', '.svelte-kit/*', '!.prettierrc', '*.min.js'],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'warn'
      }
    },
    // This configuration will apply only to TypeScript files
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      env: {
        browser: true,
        node: true,
        es6: true
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended', // TypeScript rules
        'plugin:prettier/recommended' // Prettier plugin
      ],
      rules: {
        'prettier/prettier': ['error', {}, { usePrettierrc: true }], // Includes .prettierrc.js rules

        // Why would you want unused vars?
        '@typescript-eslint/no-unused-vars': ['error'],

        '@typescript-eslint/no-non-null-assertion': 'off',

        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/no-explicit-any': 'off',

        // I suggest this setting for requiring return types on functions only where useful
        '@typescript-eslint/explicit-function-return-type': [
          'off',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true
          }
        ]
      }
    }
  ],
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020
  },
  env: {
    browser: true,
    es2017: true,
    node: true
  }
};
