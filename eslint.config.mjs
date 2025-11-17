import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
	{
		ignores: ['dist', 'node_modules', '*.config.*'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'prettier/prettier': 'warn',
		},
	},
);
