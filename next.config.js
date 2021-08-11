module.exports = {
	serverRuntimeConfig: {
		// Will only be available on the server side
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		STATIC_FOLDER: '/public',
		PORT: process.env.PORT,
		BEERBUDDY_API_HOST: process.env.BEERBUDDY_API_HOST,
		BREWERYDB_API_HOST: process.env.BREWERYDB_API_HOST,
		BREWERYDB_API_KEY: process.env.BREWERYDB_API_KEY,
		BREWERYDB_SANDBOX_API_HOST: process.env.BREWERYDB_SANDBOX_API_HOST,
		USE_SANDBOX_API: process.env.USE_SANDBOX_API,
		GA_TAG: process.env.GA_TAG,
	},
	images: {
		domains: ['brewerydb-images.s3.amazonaws.com'],
	},
}
