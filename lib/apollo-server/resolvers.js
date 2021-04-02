import { breweryDbService } from '~/api/'
import { dateScalar } from './scalars'

const resolvers = {
	// Scalars
	Date: dateScalar,
	// Queries
	Query: {
		viewer: (_, args, { dataSources, token }) => dataSources.users.getMe(token),
		userLists: (_, { userId }, { dataSources }) => dataSources.lists.getListsForUser(userId),
		userDashboard: async (_, { userId }, { dataSources, token }) => {
			const viewer = await dataSources.users.getMe(token)
			const lists = await dataSources.lists.getListsForUser(userId)
			return {
				userName: viewer.name, // TODO: is this necessary to return?
				lists,
			}
		},
		listDetails: async (_, { listId }, { dataSources }) => {
			const list = await dataSources.lists.getList(listId)
			const { name, dateCreated, dateLastModified, beerIds, breweryIds } = list
			const beerItems = beerIds.map(async id => {
				const { data } = await breweryDbService.getBeerDetails(id)
				return data
			})
			const breweryItems = breweryIds.map(async id => {
				const { data } = await breweryDbService.getBreweryDetails(id)
				return data
			})

			return {
				name,
				dateCreated,
				dateLastModified,
				beerItems,
				breweryItems,
			}
		},
	},
	// Mutations
	Mutation: {
		createNewList: (_, { input: { userId, name } }, { dataSources }) =>
			dataSources.lists.createList({ userId, name }),
	},
}

export default resolvers
