import globals from 'globals';

// Правила для webpack.config.js
export default [
  {
    files: ['webpack.config.js', 'lint-staged.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off', // Отключаем правило для require
      'no-undef': 'off', // Отключаем правило для не определенных process, __dirname, module
    },
  },
];
