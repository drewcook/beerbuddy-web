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
		dateCreated: Date!
		listIds: [ID!]
		favorites: [UserFavorite!]
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
		name: String
		nameDisplay: String
		description: String
		abv: String
		ibu: String
		labels: BeerLabels
		styleId: ID
		isOrganic: String # 'Y' or 'No'
		isRetired: String # 'Y' or 'No'
		status: String # 'verified' or ..?
		statusDisplay: String
		style: BeerStyle
		glasswareId: ID
		glass: Glassware
		breweries: [Brewery!]
		createDate: Date!
		updateDate: Date
	}
	type BeerLabels {
		icon: String
		medium: String
		large: String
	}
	type BeerStyle {
		id: ID!
		categoryId: ID
		category: BeerCategory
		name: String
		shortName: String
		description: String
		ibuMin: String
		ibuMax: String
		abvMin: String
		abvMax: String
		srmMin: String
		srmMax: String
		ogMin: String
		fgMin: String
		fgMax: String
		createDate: Date!
		updateDate: Date
	}
	type BeerCategory {
		id: ID!
		name: String
	}
	type Brewery {
		id: ID!
		name: String
		nameShortDisplay: String
		description: String
		website: String
		established: String
		isOrganic: String # 'Y' or 'No'
		isInBusiness: String # 'Y' or 'No'
		isMassOwned: String # 'Y' or 'No'
		isVerified: String # 'Y' or 'No'
		status: String # 'verified' or ..?
		statusDisplay: String
		locations: [BreweryLocation!]
		images: BreweryImages
		createDate: Date!
		updateDate: Date
		socialAccounts: [BrewerySocialAccount!]
	}
	type BrewerySocialAccount {
		id: ID!
		socialMediaId: ID
		socialMedia: BrewerySocialMediaPlatform
		handle: String
		createDate: Date!
		link: String
	}
	type BrewerySocialMediaPlatform {
		id: ID!
		name: String
		website: String
		createDate: Date!
		updateDate: Date
	}
	type BreweryLocation {
		id: ID!
		name: String
		streetAddress: String
		locality: String
		region: String
		postalCode: String
		country: Country
		phone: String
		website: String
		latitude: Float
		longitude: Float
		isPrimary: String
		inPlanning: String
		isClosed: String
		openToPublic: String
		locationType: String # TODO: enum here
		locationTypeDisplay: String
		countryIsoCode: String # enum here?
		yearOpened: String
		status: String
		statusDisplay: String
		timezoneId: String
		createDate: Date!
		updateDate: Date
		breweryId: ID
		brewery: Brewery
	}
	type BreweryImages {
		icon: String
		medium: String
		large: String
		squareMedium: String
		squareLarge: String
	}
	type Country {
		isoCode: String # enum here?
		name: String
		displayName: String
		isoThree: String
		numberCode: Int
		createDate: Date!
	}
	type Glassware {
		id: ID!
		name: String
		createdDate: Date!
	}
	type UserDashboard {
		userName: String!
		lists: [List]
		favorites: [UserFavorite!]
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
	type UserFavorite {
		_id: ID!
		itemId: String!
		name: String!
		type: FavoriteType!
	}
	# Enums
	enum FavoriteType {
		beer
		brewery
		list
	}
	# Unions
	union SearchResultItem = Beer | Brewery | BreweryLocation
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
	input AddUserFavoriteInput {
		userId: ID!
		itemId: String!
		name: String!
		type: FavoriteType!
	}
	input RemoveUserFavoriteInput {
		userId: ID!
		favoriteId: ID!
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
		userFavorites(userId: ID!): [UserFavorite!]
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
		addUserFavorite(input: AddUserFavoriteInput!): UserFavorite!
		removeUserFavorite(input: RemoveUserFavoriteInput!): UserFavorite!
	}
`

export default typeDefs
