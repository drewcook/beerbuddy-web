module.exports = {
	serverRuntimeConfig: {
		// Will only be available on the server side
		secretCookie: process.env.SECRET_COOKIE_PASSWORD, // Pass through env variables
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		staticFolder: '/public',
		port: process.env.PORT,
	},
}
