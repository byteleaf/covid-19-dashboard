module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:import/typescript', // Enables imort of .tsx files
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    '@typescript-eslint/indent': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/button-has-type': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['src/stories/**/*.stories.js', '**/*.test.js'],
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': ['error', { tsx: 'off' }],
    'jsx-a11y/label-has-associated-control': 'off',
    'no-underscore-dangle': 'off',
    'react-hooks/exhaustive-deps': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  env: {
    jest: true,
    browser: true,
  },
};
