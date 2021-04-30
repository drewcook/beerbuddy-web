import { createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import _get from 'lodash/get'
import getConfig from 'next/config'
import nookies, { parseCookies } from 'nookies'

const {
	publicRuntimeConfig: { PORT },
} = getConfig()

const authLink = setContext((request, ctx) => {
	// get the token from cookie for browser requests
	const token = process.browser ? parseCookies(null).authToken : parseCookies(ctx).authToken
	return {
		headers: {
			...ctx.headers,
			authorization: token ? `Bearer ${token}` : '',
			'client-name': 'Beer Buddy [web]',
			'client-version': '1.0.0',
		},
	}
})

export default function createFetchLink(ctx) {
	// TODO: does this need to use .env var? CLIENT_HOST
	const uri =
		process.env.NODE_ENV === 'production'
			? 'https://beerbuddy.io'
			: `http://localhost:${PORT || 5440}`
	const BASE_URL = process.browser === false ? uri : ''

	const defaultLink = createHttpLink({
		uri: `${BASE_URL}/api/graphql`,
		fetch,
		credentials: 'include', // since backend API is different origin
		headers: _get(ctx, 'req.headers'), // Pass headers (including cookies) through on server -> server calls
	})

	return authLink.concat(defaultLink)
}
