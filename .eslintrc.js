module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: './tsconfig.json',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'no-console': 'error',
    'sort-imports': 'warn',
    'no-empty-function': 'off',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/class-literal-property-style': 'error',
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/prefer-readonly': 'error',
    '@typescript-eslint/no-empty-function': [2, { allow: ['constructors'] }],
    'max-len': ['error', { code: 128 }],
    '@typescript-eslint/ban-ts-ignore': 'off',
  },
};
