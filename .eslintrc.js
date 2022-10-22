module.exports = {
  extends: ['preact', '@josselinbuils/eslint-config-typescript'],
  ignorePatterns: ['dist'],
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
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
    'import/no-import-module-exports': 'off', // false positives
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'never',
        warnOnUnassignedImports: true,
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'object',
        ],
      },
    ],
    'no-useless-constructor': 'off',
  },
};
