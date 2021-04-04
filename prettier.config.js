module.exports = {
	...require('altheajs-prettier-config'),
	semi: false,
	importOrder: ['^[./]'], //['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
	importOrderSeparation: true,
	experimentalBabelParserPluginsList: ['jsx', 'typescript'], // not using typescript ATM but might, so prepping
}
