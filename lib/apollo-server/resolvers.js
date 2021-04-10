import { dateScalar } from './scalars'

const resolvers = {
	// Scalars
	Date: dateScalar,
	// Unions
	SearchResultItem: {
		__resolveType(obj, context, info) {
			if (obj.isInBusiness) {
				return 'Brewery'
			}
			if (Array.isArray(obj.breweries)) {
				return 'Beer'
			}
			return null // GraphQLError is thrown
		},
	},
	// Queries
	Query: {
		viewer: (_, args, { dataSources, token }) => dataSources.users.getMe(token),
		userLists: (_, { userId }, { dataSources }) => dataSources.lists.getListsForUser(userId),
		userDashboard: async (_, { userId }, { dataSources, token }) => {
			try {
				const viewer = await dataSources.users.getMe(token)
				const lists = await dataSources.lists.getListsForUser(userId)
				return {
					userName: viewer.name,
					lists,
				}
			} catch (ex) {
				return ex
			}
		},
		listDetails: async (_, { listId }, { dataSources }) => {
			try {
				const list = await dataSources.lists.getList(listId)
				const { _id, name, dateCreated, dateLastModified, beerIds, breweryIds } = list

				// Populate data for each item
				const [beerItems, breweryItems] = await Promise.all([
					await beerIds.map(async id => {
						const resp = await dataSources.breweryDb.getBeerDetails(id)
						return resp
					}),
					await breweryIds.map(async id => {
						const resp = await dataSources.breweryDb.getBreweryDetails(id)
						return resp
					}),
				])

				return {
					_id,
					name,
					dateCreated,
					dateLastModified,
					beerItems,
					breweryItems,
				}
			} catch (ex) {
				return ex
			}
		},
		beerList: (_, { page }, { dataSources }) => dataSources.breweryDb.getBeer(page),
		breweryList: (_, { page }, { dataSources }) => dataSources.breweryDb.getBreweries(page),
		beer: (_, { id }, { dataSources }) => dataSources.breweryDb.getBeerDetails(id),
		brewery: (_, { id }, { dataSources }) => dataSources.breweryDb.getBreweryDetails(id),
		glassware: (_, args, { dataSources }) => dataSources.breweryDb.getGlassware(),
		userFavorites: (_, { id }, { dataSources }) => dataSources.users.getFavorites(id),
	},
	// Mutations
	Mutation: {
		createUser: (_, { input }, { dataSources }) => dataSources.users.createUser(input),
		createNewList: (_, { input: { userId, name } }, { dataSources }) =>
			dataSources.lists.createList({ userId, name }),
		deleteUserList: (_, { id }, { dataSources }) => dataSources.lists.deleteList(id),
		addItemToList: (_, { input: { listId, beerId, breweryId } }, { dataSources }) =>
			dataSources.lists.addItemToList({ listId, beerId, breweryId }),
		addItemToNewList: async (
			_,
			{ input: { userId, listName, beerId, breweryId } },
			{ dataSources },
		) => {
			const list = await dataSources.lists.createList({ userId, name: listName })
			const resp = await dataSources.lists.addItemToList({ listId: list._id, beerId, breweryId })
			return resp
		},
		removeItemFromList: (_, { input: { listId, beerId, breweryId } }, { dataSources }) =>
			dataSources.lists.removeItemFromList({ listId, beerId, breweryId }),
		searchBreweryDb: (_, { input: { page, query } }, { dataSources }) =>
			dataSources.breweryDb.search({ page, query }),
		filterByBreweryType: (_, { input: { page, type } }, { dataSources }) =>
			dataSources.breweryDb.filterByBreweryType({ page, type }),
		filterByCountry: (_, { input: { page, country } }, { dataSources }) =>
			dataSources.breweryDb.filterByCountry({ page, country }),
		filterByState: (_, { input: { page, state } }, { dataSources }) =>
			dataSources.breweryDb.filterByState({ page, state }),
		addUserFavorite: (_, { input: { userId, itemId, name, type } }, { dataSources }) =>
			dataSources.users.addUserFavorite({ userId, itemId, name, type }),
		removeUserFavorite: (_, { input: { userId, favoriteId } }, { dataSources }) =>
			dataSources.users.removeUserFavorite({ userId, favoriteId }),
	},
}

export default resolvers
