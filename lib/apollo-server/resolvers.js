const resolvers = {
	Query: {
		userLists: (_, { userId }, { dataSources }) => dataSources.lists.getListsForUser(userId),
	},
}

export default resolvers
