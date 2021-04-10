import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import getConfig from 'next/config'

const {
	publicRuntimeConfig: { port },
} = getConfig()

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = sessionStorage?.getItem('auth-token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
			'client-name': 'Beer Buddy [web]',
			'client-version': '1.0.0',
		},
	}
})

export default function createFetchLink() {
	// TODO: does this need to use .env var?
	const BASE_URL = process.browser === false ? `http://localhost:${port || 5440}` : ''

	const defaultLink = createHttpLink({
		uri: `${BASE_URL}/api/graphql`,
		fetch: !process.browser ? fetch : undefined,
		credentials: 'include', // since backend API is different origin
	})

	return authLink.concat(defaultLink)
}
