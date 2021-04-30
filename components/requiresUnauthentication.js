import _get from 'lodash/get'
import _startsWith from 'lodash/startsWith'
import nookies from 'nookies'
import getDisplayName from '@bb/lib/getDisplayName'
import redirectToPage from '@bb/lib/redirectToPage'

/*
  - A higher order component that prevents authenticated users access to a page. You should ONLY use this for top level pages and not sub-components.
  - Checks if a user JWT is found, if it is, call redirect function
*/

const requiresUnauthentication = WrappedComponent => {
	const requiresUnauthComponent = props => <WrappedComponent {...props} />

	requiresUnauthComponent.getInitialProps = async ctx => {
		try {
			// Redirect to home if token is found
			const { authToken } = nookies.get(ctx)
			if (authToken) {
				redirectToPage({ ctx, page: '/home' })
			}

			// Return original props for unauthenticated users
			// withHoc - https://github.com/vercel/next.js/issues/8919
			return { ...WrappedComponent.getInitialProps, withHoc: true }
		} catch {
			// Return original props on fail
			return { ...WrappedComponent.getInitialProps, withHoc: true }
		}
	}

	requiresUnauthComponent.displayName = `requiresUnauthentication(${getDisplayName(
		WrappedComponent,
	)})`

	return requiresUnauthComponent
}

export default requiresUnauthentication
