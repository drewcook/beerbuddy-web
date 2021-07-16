module.exports = {
	extends: ['altheajs', 'prettier'],
	settings: {
		'import/resolver': {
			alias: {
				map: [['@bb', '.']],
				extensions: ['.ts', '.js', '.jsx', '.json', '.css', '.scss'],
			},
		},
	},
	rules: {
		// Next.js application, import 'React' is implicit
		'react/react-in-jsx-scope': 'off',
		'react/jsx-filename-extension': 'off',
		// Working with Mongoose IDs in GraphQL
		'no-underscore-dangle': 'off',
		// this is annoying
		'import/no-extraneous-dependencies': 'off',
		// fun
		'react/sort-prop-types': [
			'warn',
			{
				callbacksLast: true,
				ignoreCase: true,
				requiredFirst: false,
				sortShapeProp: true,
			},
		],
	},
}
