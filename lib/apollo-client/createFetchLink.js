import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import _get from 'lodash/get'
import getConfig from 'next/config'

const {
	publicRuntimeConfig: { PORT },
} = getConfig()

const authLink = setContext((_, { headers }) => {
	// get the authentication token from session storage if it exists
	const token = process.browser ? sessionStorage?.getItem('auth-token') : undefined
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : '',
			'client-name': 'Beer Buddy [web]',
			'client-version': '1.0.0',
		},
	}
})

export default function createFetchLink(ctx) {
	// TODO: does this need to use .env var?
	const uri =
		process.env.NODE_ENV === 'production'
			? 'https://beerbuddy.io'
			: `http://localhost:${PORT || 5440}`
	const BASE_URL = process.browser === false ? uri : ''

	const defaultLink = createHttpLink({
		uri: `${BASE_URL}/api/graphql`,
		fetch: !process.browser ? fetch : undefined,
		credentials: 'include', // since backend API is different origin
		headers: _get(ctx, 'req.headers'), // Pass headers (including cookies) through on server -> server calls
	})

	return authLink.concat(defaultLink)
}
