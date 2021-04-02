export default error => {
	if (error.graphQLErrors) {
		for (const graphQLError of error.graphQLErrors) {
			if (graphQLError.extensions?.response?.body) {
				return graphQLError.extensions.response.body
			}
			return graphQLError.message
		}
	}
	return error.message
}
