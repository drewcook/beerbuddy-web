import { breweryDbService } from '@bb/api/'
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
					userName: viewer.name, // TODO: is this necessary to return?
					lists,
				}
			} catch (ex) {
				return ex
			}
		},
		listDetails: async (_, { listId }, { dataSources }) => {
			try {
				const list = await dataSources.lists.getList(listId)
				const { name, dateCreated, dateLastModified, beerIds, breweryIds } = list

				// Populate data for each item
				const beerItems = await Promise.all(
					beerIds.map(async id => {
						const resp = breweryDbService.getBeerDetails(id)
						return resp.data
					}),
				)
				const breweryItems = await Promise.all(
					breweryIds.map(async id => {
						const resp = await breweryDbService.getBreweryDetails(id)
						return resp.data
					}),
				)

				console.log({ breweryItems, beerItems })

				return {
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
		addItemToList: async (_, { input: { listId, beerId, breweryId } }, { dataSources }) => {
			try {
				const resp = await dataSources.lists.addItemToList({ listId, beerId, breweryId })
				return resp
			} catch (ex) {
				return ex
			}
		},
	},
}

export default resolvers
