/* eslint-disable global-require */
module.exports = {
	...require('altheajs-prettier-config'),
	semi: false,
	importOrder: [
		'^@bb/api/(.*)$',
		'^@bb/lib/(.*)$',
		'^@bb/components/(.*)$',
		'^@bb/public/(.*)$',
		'^@bb/styles/(.*)$',
		'^[./]',
	],
	importOrderSeparation: false,
	experimentalBabelParserPluginsList: ['jsx', 'typescript'], // not using typescript ATM but might, so prepping
}
