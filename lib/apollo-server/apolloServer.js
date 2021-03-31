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
	context: () => ({
		token: 'foo', // hmm... how to get this?
	}),
})

export default server
