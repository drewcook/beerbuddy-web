import { InMemoryCache } from '@apollo/client'

export default function createCache() {
	const options = {
		addTypename: true,
		typePolicies: {
			Query: {
				fields: {},
			},
			Mutation: {
				fields: {},
			},
		},
		cacheRedirects: {
			Query: {},
			Mutation: {},
		},
	}
	return new InMemoryCache()
}
