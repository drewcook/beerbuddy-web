import _get from 'lodash/get'
import nookies from 'nookies'
import { initializeApollo } from '@bb/lib/apollo-client/apolloClient'
import { VIEWER_QUERY } from '@bb/lib/apollo-client/schemas'
import getDisplayName from '@bb/lib/getDisplayName'
import redirectToPage from '@bb/lib/redirectToPage'

/*
  - A higher order component that restricts access to a page.  You should ONLY use this for top level pages and not sub-components.
  - Checks if a user JWT is found, if not, call redirect function
  - If it finds a user JWT, make GQL call to get viewer information
	- Pass through viewer information as prop to wrapped component
*/

const requiresAuthentication = WrappedComponent => {
	const requiresAuthComponent = props => <WrappedComponent {...props} />

	// TODO: this still doesn't support full use of getServerSideProps or getInitialProps on a page component using this
	requiresAuthComponent.getInitialProps = async ctx => {
		// Redirect to login if no token found
		const { authToken } = nookies.get(ctx)

		if (!authToken) {
			redirectToPage({ ctx, page: '/login' })
		}

		// Require Apollo Client
		const apolloClient = initializeApollo({ ctx })
		if (!apolloClient) {
			throw Error('Apollo Client is required.')
		}

		// Find User
		const response = await apolloClient.query({
			query: VIEWER_QUERY,
			context: ctx.res
				? {
						// Pass through for server-to-server calls
						headers: {
							Authorization: `Bearer ${authToken}`,
						},
				  }
				: {},
		})
		const me = _get(response, 'data.viewer')
		// Pass user data down as 'me' prop for authenticated users
		// Pass through all query params as props
		return { ...WrappedComponent.getInitialProps, ...ctx.query, me }
	}

	requiresAuthComponent.displayName = `requiresAuthentication(${getDisplayName(WrappedComponent)})`

	return requiresAuthComponent
}

export default requiresAuthentication
