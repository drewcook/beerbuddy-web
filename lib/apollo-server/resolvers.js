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
	},
	// Mutations
	Mutation: {
		createNewList: (_, { input: { userId, name } }, { dataSources }) =>
			dataSources.lists.createList({ userId, name }),
	},
}

export default resolvers
