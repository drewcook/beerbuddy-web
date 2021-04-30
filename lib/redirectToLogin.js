/*
  This component basically redirects a user to the login page.
	TODO: Add in support with a proper redirect URI.
*/

const redirectToLogin = ({ ctx }) => {
	const loginUrl = '/login'
	console.log('Redirecting to login...')

	if (ctx && ctx.res) {
		// Server
		ctx.res.writeHead(301, { Location: loginUrl })
		ctx.res.end()
	} else {
		// Browser
		window.location.replace(loginUrl)
		// or router from 'next/router'
		// Router.replace(loginUrl)
	}
}

export default redirectToLogin
