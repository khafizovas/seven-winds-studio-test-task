import globals from 'globals';

// Правила для JS с require, потому что это только конфиги или скрипты для разработки
export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Отключаем правило для require
      'no-undef': 'off', // Отключаем правило для не определенных process, __dirname, module
    },
  },
];
