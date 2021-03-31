import { ApolloServer } from 'apollo-server'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import ListsAPI from '../../api/ListsAPI'
import ListsAPI from '../../api/UsersAPI'

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		lists: new ListsAPI(),
		users: new UsersAPI(),
	}),
	context: () => ({
		token: 'foo', // hmm... how to get this?
	}),
})

const initApolloServer = () => {
	server.listen().then(({ url }) => {
		console.log(`🚀 GraphQL Apollo Server ready at ${url}`)
	})
}

export default initApolloServer
