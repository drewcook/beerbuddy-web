import { gql } from '@apollo/client'
import { BEER_CARD_PARTS, BREWERY_CARD_PARTS } from './fragments'

// User lists page
export const USER_LISTS_QUERY = gql`
	query GetUserLists($userId: ID!) {
		userLists(userId: $userId) {
			_id
			name
			dateCreated
			beerIds
			breweryIds
		}
	}
`
// Add item dialog
export const ADD_ITEM_MUTATION = gql`
	mutation AddItemToList($input: UpdateListInput!) {
		addItemToList(input: $input) {
			_id
			name
			beerIds
			breweryIds
			dateLastModified
		}
	}
`
export const ADD_ITEM_NEW_LIST_MUTATION = gql`
	mutation AddItemToNewList($input: AddItemNewListInput!) {
		addItemToNewList(input: $input) {
			_id
			name
			beerIds
			breweryIds
			dateLastModified
		}
	}
`
// Create list dialog
export const CREATE_NEW_LIST = gql`
	mutation CreatNewList($input: CreateListInput!) {
		createNewList(input: $input) {
			_id
			name
			dateCreated
		}
	}
`
// Viewer context
export const VIEWER_QUERY = gql`
	query GetViewer {
		viewer {
			_id
			dateCreated
			name
			email
			listIds
			favorites {
				_id
				itemId
				name
				type
			}
		}
	}
`
// Create account
export const CREATE_USER_MUTATION = gql`
	mutation CreateUser($input: CreateUserInput!) {
		createUser(input: $input) {
			_id
		}
	}
`
// User dashboard
export const USER_DASHBOARD_QUERY = gql`
	query GetUserDashboard($userId: ID!) {
		userDashboard(userId: $userId) {
			userName
			lists {
				_id
				name
				dateCreated
			}
			favorites {
				_id
				itemId
				name
				type
			}
		}
	}
`
export const USER_FAVORITES_QUERY = gql`
	query GetUserFavorites($userId: ID!) {
		userFavorites(userId: $userId) {
			_id
			itemId
			name
			type
		}
	}
`
export const ADD_USER_FAVORITE_MUTATION = gql`
	mutation AddUserFavorite($input: AddUserFavoriteInput!) {
		addUserFavorite(input: $input) {
			itemId
		}
	}
`
export const REMOVE_USER_FAVORITE_MUTATION = gql`
	mutation RemoveUserFavorite($input: RemoveUserFavoriteInput!) {
		removeUserFavorite(input: $input) {
			itemId
		}
	}
`

// List details
export const LIST_DETAILS_QUERY = gql`
	query GetListDetails($listId: ID!) {
		listDetails(listId: $listId) {
			_id
			name
			dateCreated
			dateLastModified
			beerItems {
				id
				name
				abv
				ibu
				isOrganic
				style {
					shortName
					category {
						name
					}
				}
			}
			breweryItems {
				id
				name
				isOrganic
				locations {
					locality
					region
					country {
						displayName
					}
				}
			}
		}
	}
`
export const REMOVE_ITEM_MUTATION = gql`
	mutation RemoveItemFromList($input: UpdateListInput!) {
		removeItemFromList(input: $input) {
			_id
			beerIds
			breweryIds
			dateLastModified
		}
	}
`
export const DELETE_LIST_MUTATION = gql`
	mutation DeleteUserList($id: ID!) {
		deleteUserList(id: $id) {
			_id
		}
	}
`
// Beer
export const BEER_LIST_QUERY = gql`
	${BEER_CARD_PARTS}
	query GetBeerList($page: Int!) {
		beerList(page: $page) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on Beer {
					...BeerCardParts
				}
			}
		}
	}
`
export const BEER_DETAILS_QUERY = gql`
	query GetBeerDetails($id: ID!) {
		beer(id: $id) {
			id
			name
			description
			abv
			ibu
			labels {
				large
			}
			isOrganic
			isRetired
			style {
				category {
					name
				}
				name
				shortName
				description
			}
			glasswareId
			glass {
				name
			}
			breweries {
				id
				name
			}
		}
	}
`
// Breweries
export const BREWERY_LIST_QUERY = gql`
	${BREWERY_CARD_PARTS}
	query GetBreweryList($page: Int!) {
		breweryList(page: $page) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on Brewery {
					...BreweryCardParts
				}
			}
		}
	}
`
export const BREWERY_DETAILS_QUERY = gql`
	query GetBreweryDetails($id: ID!) {
		brewery(id: $id) {
			id
			name
			description
			website
			images {
				large
			}
			established
			isOrganic
			isMassOwned
			isInBusiness
			locations {
				id
				name
				locationTypeDisplay
				streetAddress
				locality
				region
				postalCode
				country {
					displayName
				}
				openToPublic
				isClosed
			}
			socialAccounts {
				id
				socialMedia {
					name
				}
				link
			}
		}
	}
`
// Other
export const SEARCH_BREWERYDB_MUTATION = gql`
	${BEER_CARD_PARTS}
	${BREWERY_CARD_PARTS}
	mutation SearchBreweryDb($input: SearchInput!) {
		searchBreweryDb(input: $input) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on Beer {
					...BeerCardParts
				}
				... on Brewery {
					...BreweryCardParts
				}
			}
		}
	}
`
export const FILTER_BY_BREWERY_TYPE_MUTATION = gql`
	${BREWERY_CARD_PARTS}
	mutation FilterByBreweryType($input: FilterBreweryInput!) {
		filterByBreweryType(input: $input) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on BreweryLocation {
					name
					brewery {
						...BreweryCardParts
					}
				}
			}
		}
	}
`
export const FILTER_BY_COUNTRY_MUTATION = gql`
	${BREWERY_CARD_PARTS}
	mutation FilterByCountry($input: FilterCountryInput!) {
		filterByCountry(input: $input) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on BreweryLocation {
					name
					brewery {
						...BreweryCardParts
					}
				}
			}
		}
	}
`
export const FILTER_BY_STATE_MUTATION = gql`
	${BREWERY_CARD_PARTS}
	mutation FilterByState($input: FilterStateInput!) {
		filterByState(input: $input) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on BreweryLocation {
					name
					brewery {
						...BreweryCardParts
					}
				}
			}
		}
	}
`
