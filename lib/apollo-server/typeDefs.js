import { gql } from 'apollo-server-micro'

const typeDefs = gql`
	type Query {
		viewer: Viewer
		userLists(userId: ID!): [List]
	}
	type Viewer {
		_id: ID!
		name: String!
		email: String!
		password: String!
		listIds: [ID]
	}
	type List {
		_id: ID!
		name: String!
	}
`

export default typeDefs
