import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

import eslintConfigPrettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';

// Общие правила
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs['recommended-latest'],

  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error', // Добавляет Prettier как правило ESLint
      'max-depth': ['warn', 3], // Запрещает вложенность в коде уровня больше 3 отступов
    },
  },
  eslintConfigPrettier, // Отключает правила, конфликтующие с Prettier
];
