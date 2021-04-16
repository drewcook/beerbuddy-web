/*
  This component basically redirects a user to the login page.
	TODO: Add in support with a proper redirect URI.
*/

const redirectToLogin = ({ ctx }) => {
	const loginUrl = '/login'

	if (ctx && ctx.res) {
		// Server
		console.log('i should redirect', ctx.res)
		// ctx.res.redirect(301, loginUrl)
		// ctx.res.end()
	} else {
		// Browser
		window.location.replace(loginUrl)
	}
}

export default redirectToLogin
