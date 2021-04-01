import apolloServer from '../../lib/apollo-server/apolloServer'

// This prevents Next from parsing the body of incoming HTTP requests
// and to prefer our GraphQL server instead
export const config = {
	api: {
		bodyParser: false,
	},
}

export default apolloServer.createHandler({ path: '/api/graphql' })
