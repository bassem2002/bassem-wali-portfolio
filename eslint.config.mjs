import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  { ignores: ['dist/**', '.astro/**', '.qa/**', 'node_modules/**', '.npm-cache/**'] },
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
);
