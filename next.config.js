module.exports = {
	serverRuntimeConfig: {
		// Will only be available on the server side
		// Pass through env variables
		BEERBUDDY_API_HOST: process.env.BEERBUDDY_API_HOST,
		BREWERYDB_API_HOST: process.env.BREWERYDB_API_HOST,
		BREWERYDB_API_KEY: process.env.BREWERYDB_API_KEY,
		BREWERYDB_SANDBOX_API_HOST: process.env.BREWERYDB_SANDBOX_API_HOST,
		USE_SANDBOX_API: process.env.USE_SANDBOX_API,
		GA_TAG: process.env.GA_TAG,
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		staticFolder: '/public',
		port: process.env.PORT,
		beerBuddyApiHost: process.env.BEERBUDDY_API_HOST,
		breweryDBApiHost: process.env.BREWERYDB_API_HOST,
		breweryDBApiKey: process.env.BREWERYDB_API_KEY,
		breweryDBSandboxApiHost: process.env.BREWERYDB_SANDBOX_API_HOST,
		useSandboxApi: process.env.USE_SANDBOX_API,
		GA_TAG: process.env.GA_TAG,
	},
}
