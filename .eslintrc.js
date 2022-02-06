module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'no-undef': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-native/no-inline-styles': 'off',
  },
  ignorePatterns: ['*.js'] // Only config js files
};
