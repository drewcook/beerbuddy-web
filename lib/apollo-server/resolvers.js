import * as breweryDbService from '@bb/api/breweryDb'
import { dateScalar } from './scalars'

const resolvers = {
	// Scalars
	Date: dateScalar,
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
					beerIds.map(async id => {
						const resp = await breweryDbService.getBeerDetails(id)
						return resp.data
					}),
					breweryIds.map(async id => {
						const resp = await breweryDbService.getBreweryDetails(id)
						return resp.data
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
	},
	// Mutations
	Mutation: {
		createUser: (_, { input }, { dataSources }) => dataSources.users.createUser(input),
		createNewList: (_, { input: { userId, name } }, { dataSources }) =>
			dataSources.lists.createList({ userId, name }),
		deleteUserList: (_, { id }, { dataSources }) => dataSources.lists.deleteList(id),
		addItemToList: (_, { input: { listId, beerId, breweryId } }, { dataSources }) =>
			dataSources.lists.addItemToList({ listId, beerId, breweryId }),
		removeItemFromList: (_, { input: { listId, beerId, breweryId } }, { dataSources }) =>
			dataSources.lists.removeItemFromList({ listId, beerId, breweryId }),
	},
}

export default resolvers
