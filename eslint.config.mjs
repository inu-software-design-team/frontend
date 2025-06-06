import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: ['features/*/*', '!features/*/*/*'],
        },
      ],
    },
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...eslintPluginStorybook.configs['flat/recommended'],
  eslintConfigPrettier,
];

export default eslintConfig;
