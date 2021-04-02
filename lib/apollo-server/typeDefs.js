import { gql } from 'apollo-server-micro'

const typeDefs = gql`
	# Scalars
	scalar Date
	# Types
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
		beerIds: [String]
		breweryIds: [String]
	}
	type UserDashboard {
		userName: String!
		lists: [List]
	}
	# Inputs
	input CreateListInput {
		userId: ID!
		name: String!
	}
	# Queries
	type Query {
		viewer: Viewer
		userLists(userId: ID!): [List]
		userDashboard(userId: ID!): UserDashboard
	}
	# Mutations
	type Mutation {
		createNewList(input: CreateListInput!): List
	}
`

export default typeDefs
