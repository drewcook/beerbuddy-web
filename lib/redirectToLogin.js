/*
  This component basically redirects a user to the login page.
	TODO: Add in support with a proper redirect URI.
*/

const redirectToLogin = ({ ctx }) => {
	const loginUrl = '/login'

	if (ctx && ctx.res) {
		// Server
		ctx.res.redirect(loginUrl)
		ctx.res.end()
	} else {
		// Browser
		window.location.replace(loginUrl)
	}
}

export default redirectToLogin
