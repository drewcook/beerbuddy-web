const resolvers = {
	Query: {
		viewer: (_, args, { dataSources, token }) => dataSources.users.getMe(token),
		userLists: (_, { userId }, { dataSources }) => dataSources.lists.getListsForUser(userId),
	},
}

export default resolvers
