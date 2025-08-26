module.exports = {
    extends: [
      'universe',
      'universe/native',
      'universe/web',
      'universe/shared/typescript-analysis'
    ],
    overrides: [
      {
        files: ['*.ts', '*.tsx', '*.d.ts'],
        parserOptions: {
          project: './tsconfig.json'
        }
      }
    ],
    rules: {
      'import/order': [
        'error',
        {
          'groups': [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index'
          ],
          'newlines-between': 'always',
          'alphabetize': {
            'order': 'asc',
            'caseInsensitive': true
          }
        }
      ],
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-const': 'error'
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json'
        }
      }
    }
  };