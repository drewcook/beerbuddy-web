import { gql } from 'apollo-server-micro'

const typeDefs = gql`
	type Query {
		userLists(userId: String!): [List]
	}
	type List {
		_id: ID!
		name: String!
	}
`

export default typeDefs
