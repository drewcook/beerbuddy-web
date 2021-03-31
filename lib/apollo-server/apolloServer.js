import { ApolloServer } from 'apollo-server-micro'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import ListsAPI from '../../api/ListsAPI'
import UsersAPI from '../../api/UsersAPI'

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		lists: new ListsAPI(),
		users: new UsersAPI(),
	}),
	context: ({ req }) => {
		// Get the user token from the headers.
		const token = req.headers.authorization || ''

		// TODO: Try to retrieve a user with the token
		// const user = await getUser(token.split(' '))

		// Add the user/token to the context
		return { token }
	},
})

export default server
