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
	type Glassware {
		id: ID!
		name: String!
		createdDate: Date!
	}
	type UserDashboard {
		userName: String!
		lists: [List]
	}
	type ListDetails {
		_id: ID!
		name: String!
		dateCreated: Date!
		dateLastModified: Date!
		beerItems: [Beer]
		breweryItems: [Brewery]
		userId: ID!
	}
	type BreweryDbList {
		currentPage: Int
		numberOfPages: Int
		totalResults: Int
		data: [SearchResultItem]
	}
	# Unions
	union SearchResultItem = Beer | Brewery
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
	input UpdateListInput {
		listId: ID!
		beerId: ID
		breweryId: ID
	}
	input AddItemNewListInput {
		userId: ID!
		listName: String!
		beerId: ID
		breweryId: ID
	}
	input SearchInput {
		page: Int!
		query: String!
	}
	input FilterBreweryInput {
		page: Int!
		type: String! # TODO: enum micro/macro/restaurant/tasting/brewpub/office/production
	}
	input FilterCountryInput {
		page: Int!
		country: String!
	}
	input FilterStateInput {
		page: Int!
		state: String!
	}
	# Queries
	type Query {
		viewer: Viewer!
		userLists(userId: ID!): [List]!
		userDashboard(userId: ID!): UserDashboard!
		listDetails(listId: ID!): ListDetails!
		beerList(page: Int!): BreweryDbList!
		breweryList(page: Int!): BreweryDbList!
		beer(id: ID!): Beer!
		brewery(id: ID!): Brewery!
		glassware: [Glassware]!
	}
	# Mutations
	type Mutation {
		createUser(input: CreateUserInput!): Viewer!
		createNewList(input: CreateListInput!): List!
		deleteUserList(id: ID!): List!
		addItemToList(input: UpdateListInput!): List!
		addItemToNewList(input: AddItemNewListInput!): List!
		removeItemFromList(input: UpdateListInput!): List!
		searchBreweryDb(input: SearchInput!): BreweryDbList!
		filterByBreweryType(input: FilterBreweryInput!): BreweryDbList!
		filterByCountry(input: FilterCountryInput!): BreweryDbList!
		filterByState(input: FilterStateInput!): BreweryDbList!
	}
`

export default typeDefs
