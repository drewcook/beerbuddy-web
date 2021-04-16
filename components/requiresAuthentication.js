// import { wrapGetInitialProps } from '@gloojs/react-lib'
import _get from 'lodash/get'
import _startsWith from 'lodash/startsWith'
import { initializeApollo } from '@bb/lib/apollo-client/apolloClient'
import { VIEWER_QUERY } from '@bb/lib/apollo-client/schemas'
import getDisplayName from '@bb/lib/getDisplayName'
import redirectToLogin from '@bb/lib/redirectToLogin'
import withInitialPropsRedirect from './withInitialPropsRedirect'

/*
  - A higher order component that restricts access to a page.  You should _only_
  use this for top level pages and not sub-components.
  - Checks if a user JWT is found, if not, call redirect function
  - If it finds a user JWT, continue to render wrapped component
  - This HOC takes in a function as an argument, which takes in ctx, and returns a redirectUri as type string
*/

// const clientHost = getClientHost()
// const SECURE_COOKIES = _startsWith(clientHost, 'https') // Only use secure cookies when the CLIENT_HOST is https

const requiresAuthentication = () => WrappedComponent => {
	const requiresAuth = props => <WrappedComponent {...props} />

	requiresAuth.getServerSideProps = async ctx => {
		console.log('in requiresAuth serversideprops')
		const apolloClient = initializeApollo({ ctx })
		const accessToken = false //sessionStorage?.getItem('auth-token')

		if (!apolloClient) {
			throw Error('Apollo Client is required.')
		}

		if (!accessToken) {
			console.info('accessToken not found, redirecting user to login')

			redirectToLogin({ ctx })
			return { initialPropsRedirecting: true }
		}

		console.info('accessToken found, continuing on finding the user...')
		// const response = await apolloClient.query({ query: VIEWER_QUERY })
		// const me = _get(response, 'data.viewer.me')

		return {
			props: {
				...WrappedComponent.getServerSideProps,
				isAuthedOut: true,
			},
		}
	}

	requiresAuthentication.displayName = `requiresAuthentication(${getDisplayName(WrappedComponent)})`

	return withInitialPropsRedirect()(requiresAuth)
}

export default requiresAuthentication
