module.exports = {
  extends: ['preact', '@josselinbuils/eslint-config-typescript'],
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/no-var-requires': 'off', // apply to js
    'global-require': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-useless-constructor': 'off',
  },
};
