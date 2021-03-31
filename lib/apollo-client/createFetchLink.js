import _get from 'lodash/get'
import { createHttpLink } from '@apollo/client'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { PORT } = publicRuntimeConfig

export default function createFetchLink(ctx) {
	const BASE_URL = process.browser === false ? `http://localhost:${PORT || 3000}` : ''

	const defaultLink = createHttpLink({
		uri: `${BASE_URL}/graphql`,
		fetch: !process.browser ? fetch : undefined,
		headers: _get(ctx, 'req.headers'),
		credentials: 'same-origin', // Pass headers (including cookies) through on server -> server calls
	})

	return defaultLink
}
