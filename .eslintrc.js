module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  globals: {
    JSX: true,
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    'import/extensions': 'off',
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'no-prototype-builtins': 'off',
    'func-names': 'off',
    'react/jsx-filename-extension': 'off',
    'no-restricted-exports': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'max-len': ['error', { code: 120, tabWidth: 2 }],
    'no-plusplus': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.spec.js',
          '**/*.spec.ts',
          '**/*.spec.jsx',
          '**/*.spec.tsx',
        ],
      },
    ],
  },
};
