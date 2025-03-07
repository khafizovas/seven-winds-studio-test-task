import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

// Правила для всех файлов в src/
export default [
  {
    files: ['src/**/*'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Делает необязательным импорт React
      'no-var': 'error', // Запрещает использование `var`
      'prefer-const': 'warn', // Предупреждает, если `let` можно заменить на `const`
      'no-restricted-imports': [
        // Для соблюдения строгого публичного API
        'error',
        {
          paths: [
            {
              name: 'shared',
              message:
                'Import from shared/* should be done through shared/index.ts',
            },
            {
              name: 'entities',
              message:
                'Import from entities/* should be done through entities/index.ts',
            },
            {
              name: 'features',
              message:
                'Import from features/* should be done through features/index.ts',
            },
            {
              name: 'widgets',
              message:
                'Import from widgets/* should be done through widgets/index.ts',
            },
            {
              name: 'pages',
              message:
                'Import from pages/* should be done through pages/index.ts',
            },
          ],
          patterns: [
            'shared/*/*', // Запрещает импорт из shared/*, кроме shared/index.ts
            'entities/*/*', // Запрещает импорт из entities/*, кроме entities/index.ts
            'features/*/*', // Запрещает импорт из features/*, кроме features/index.ts
            'widgets/*/*', // Запрещает импорт из widgets/*, кроме widgets/index.ts
            'pages/*/*', // Запрещает импорт из pages/*, кроме pages/index.ts
          ],
        },
      ],
    },
  },
];
