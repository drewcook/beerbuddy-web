module.exports = {
	serverRuntimeConfig: {
		// Will only be available on the server side
		// Pass through env variables
		BEERBUDDY_API_HOST: process.env.BEERBUDDY_API_HOST,
		BREWERYDB_API_HOST: process.env.BREWERYDB_API_HOST,
		BREWERYDB_API_KEY: process.env.BREWERYDB_API_KEY,
		BREWERYDB_SANDBOX_API_HOST: process.env.BREWERYDB_SANDBOX_API_HOST,
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		staticFolder: '/public',
		port: process.env.PORT,
		breweryDBApiHost: process.env.BREWERYDB_API_HOST,
		breweryDBApiKey: process.env.BREWERYDB_API_KEY,
	},
}
