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
		beerIds: [String]
		breweryIds: [String]
		dateCreated: Date!
		dateLastModified: Date!
	}
	type Beer {
		id: ID!
		name: String!
		description: String
		abv: String
		ibu: String
		labels: BeerLabels
		styleId: Int
		isOrganic: String # 'Y' or 'No'
		isRetired: String # 'Y' or 'No'
		status: String # 'verified' or ..?
		style: BeerStyle
		glass: Glassware
		breweries: [Brewery]
	}
	type BeerLabels {
		icon: String
		medium: String
		large: String
	}
	type BeerStyle {
		id: ID!
		category: BeerCategory
		name: String!
		shortName: String
		description: String
	}
	type BeerCategory {
		id: ID!
		name: String!
	}
	type Glassware {
		id: ID!
		name: String!
	}
	type Brewery {
		id: ID!
		name: String!
		description: String
		website: String
		established: String
		isOrganic: String # 'Y' or 'No'
		isInBusiness: String # 'Y' or 'No'
		isMassOwned: String # 'Y' or 'No'
		isVerified: String # 'Y' or 'No'
		status: String! # 'verified' or ..?
		locations: [BreweryLocation]
	}
	type BreweryLocation {
		locality: String
		region: String
		country: Country
	}
	type Country {
		displayName: String
	}
	type UserDashboard {
		userName: String!
		lists: [List]
	}
	type ListDetails {
		name: String!
		dateCreated: Date!
		dateLastModified: Date!
		beerItems: [Beer]
		breweryItems: [Brewery]
	}
	# Inputs
	input CreateUserInput {
		name: String!
		email: String!
		password: String!
	}
	input CreateListInput {
		userId: ID!
		name: String!
	}
	input AddItemToListInput {
		listId: ID!
		beerId: ID
		breweryId: ID
	}
	# Queries
	type Query {
		viewer: Viewer
		userLists(userId: ID!): [List]
		userDashboard(userId: ID!): UserDashboard
		listDetails(listId: ID!): ListDetails
	}
	# Mutations
	type Mutation {
		createUser(input: CreateUserInput!): Viewer
		createNewList(input: CreateListInput!): List
		addItemToList(input: AddItemToListInput!): List
	}
`

export default typeDefs
