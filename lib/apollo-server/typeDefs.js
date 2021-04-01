import { gql } from 'apollo-server-micro'

const typeDefs = gql`
	scalar Date
	type Query {
		viewer: Viewer
		userLists(userId: ID!): [List]
		userDashboard(userId: ID!): UserDashboard
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
		dateCreated: Date!
	}
	type UserDashboard {
		userName: String!
		lists: [List]
	}
`

export default typeDefs
