import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { initializeApollo, addApolloState } from '../../lib/apollo-client/apolloClient'
import { gql } from '@apollo/client'

const USER_LISTS_QUERY = gql`
	query GetUserLists($userId: String!) {
		userLists(userId: $userId) {
			_id
			name
		}
	}
`

const UserListsPage = ({ lists }) => {
	return (
		<div>
			<Typography variant="h3">My Lists</Typography>
			{!lists.length ? (
				<Typography color="error">No Lists Found</Typography>
			) : (
				lists.map(list => (
					<Card>
						<CardContent>
							<Typography>ID: {list.id}</Typography>
							<Typography>Name: {list.name}</Typography>
						</CardContent>
						<CardActions>
							<Button variant="outlined" color="secondary">
								View Details
							</Button>
						</CardActions>
					</Card>
				))
			)}
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const apolloClient = initializeApollo(ctx)

	const { data } = await apolloClient.query({
		query: USER_LISTS_QUERY,
		variables: { userId: '12345 ' },
	})

	console.log({ data }, data.userLists)

	return addApolloState(apolloClient, {
		props: { lists: data.userLists },
	})
}

export default UserListsPage
