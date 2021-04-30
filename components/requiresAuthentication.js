// import { wrapGetInitialProps } from '@gloojs/react-lib'
import _get from 'lodash/get'
import _startsWith from 'lodash/startsWith'
import nookies from 'nookies'
import { initializeApollo } from '@bb/lib/apollo-client/apolloClient'
import { VIEWER_QUERY } from '@bb/lib/apollo-client/schemas'
import getDisplayName from '@bb/lib/getDisplayName'
import redirectToLogin from '@bb/lib/redirectToLogin'

/*
  - A higher order component that restricts access to a page.  You should _only_
  use this for top level pages and not sub-components.
  - Checks if a user JWT is found, if not, call redirect function
  - If it finds a user JWT, continue to render wrapped component
  - This HOC takes in a function as an argument, which takes in ctx, and returns a redirectUri as type string
*/

const requiresAuthentication = WrappedComponent => {
	const requiresAuthComponent = props => <WrappedComponent {...props} />

	requiresAuthComponent.getInitialProps = async ctx => {
		const apolloClient = initializeApollo({ ctx })
		const { authToken } = nookies.get(ctx)

		if (!apolloClient) {
			throw Error('Apollo Client is required.')
		}

		if (!authToken) {
			console.info('No access token found. Redirecting to login...')

			redirectToLogin({ ctx })
			return {
				redirect: {
					permanent: false,
					destination: '/login',
				},
			}
		}

		// TODO: can add props here and almost replace ViewerContext with 'me'
		// console.info('accessToken found, optionally continuing on finding the user...')
		// const response = await apolloClient.query({ query: VIEWER_QUERY })
		// console.log('got the user', response)
		// const me = _get(response, 'data.viewer')

		return {
			props: {
				...WrappedComponent.getServerSideProps,
				// isAuthedOut: true, etc.
				// me,
			},
		}
	}

	requiresAuthComponent.displayName = `requiresAuthentication(${getDisplayName(WrappedComponent)})`

	return requiresAuthComponent
}

export default requiresAuthentication
