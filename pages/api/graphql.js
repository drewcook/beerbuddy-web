import apolloServer from '../../lib/apollo-server/apolloServer'

export const config = {
	api: {
		bodyParser: false,
	},
}

export default apolloServer.createHandler({ path: '/api/graphql' })
