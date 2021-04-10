import { gql } from '@apollo/client'

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
			name
			email
			listIds
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
	query GetBeerList($page: Int!) {
		beerList(page: $page) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on Beer {
					id
					name
					abv
					ibu
					breweries {
						name
					}
					style {
						shortName
					}
					labels {
						medium
					}
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
	query GetBreweryList($page: Int!) {
		breweryList(page: $page) {
			currentPage
			numberOfPages
			totalResults
			data {
				... on Brewery {
					id
					name
					website
					locations {
						locality
						region
						country {
							displayName
						}
					}
					images {
						squareMedium
					}
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
				socialMedia {
					name
				}
				link
			}
		}
	}
`
