module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: 'readonly',
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
    'max-len': ['error', { code: 120, tabWidth: 2 }],
  },
};
