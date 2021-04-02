import { ApolloServer } from 'apollo-server-micro'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import ListsAPI from '~/api/ListsAPI'
import UsersAPI from '~/api/UsersAPI'

const initApolloServer = () => {
	const apis = () => ({
		lists: new ListsAPI(),
		users: new UsersAPI(),
	})

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources: apis,
		context: ({ req }) => {
			// Get the user token from the headers.
			const token = req.headers.authorization || ''

			if (token) {
				// const user = await apis.users.getMe()
				// const user = await getUser(token.split(' '))
				// if (!user) throw new AuthenticationError('you must be logged in')
			}

			// Add the user/token to the context
			return { token }
		},
	})

	return server
}

const apolloServer = initApolloServer()

export default apolloServer
