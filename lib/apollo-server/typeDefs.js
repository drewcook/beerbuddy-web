import { gql } from 'apollo-server'

const typeDefs = gql`
	type Query {
		userLists(userId: String!): [List]
	}
	type List {
		id: ID!
		name: String!
	}
`

export default typeDefs
