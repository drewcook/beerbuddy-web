import Router from 'next/router'

/*
  This component basically redirects a user to a sepcified page.
	The page must map to a Next.js page.  Defaults to index.

	redirectToPage({ ctx, page: '/login' })
	redirectToPage({ ctx, page: '/home' })
*/
const redirectToPage = ({ ctx = null, page = '/' }) => {
	console.log(`Redirecting to ${page}...`)

	if (ctx && ctx.res) {
		// Server
		ctx.res.writeHead(301, { Location: page })
		ctx.res.end()
	} else {
		// Browser
		Router.replace(page)
	}
}

export default redirectToPage
