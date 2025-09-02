module.exports = {
	env: { es2021: true, node: true },
	parser: '@typescript-eslint/parser',
	parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname, sourceType: 'module' },
	plugins: ['@typescript-eslint', 'import', 'prettier'],
	extends: [
		'airbnb-base',
		'airbnb-typescript/base',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/typescript',
		'plugin:prettier/recommended',
		'prettier',
	],
	rules: {
		'no-console': 'off',
		'import/prefer-default-export': 'off',
		'class-methods-use-this': 'off',
		'max-depth': ['error', 2],
	},
	settings: {
		'import/resolver': { typescript: {} },
	},
};
