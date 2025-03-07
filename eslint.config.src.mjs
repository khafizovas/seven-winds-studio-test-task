import globals from 'globals';
import pluginReact from 'eslint-plugin-react';

// Правила для всех файлов в src/
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
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
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Делает необязательным импорт React
      'no-var': 'error', // Запрещает использование `var`
      'prefer-const': 'warn', // Предупреждает, если `let` можно заменить на `const`
    },
  },
];
