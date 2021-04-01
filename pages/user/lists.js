import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import LoadingState from '../../components/LoadingState'
import { useViewer } from '../../components/ViewerContext'

const USER_LISTS_QUERY = gql`
	query GetUserLists($userId: ID!) {
		userLists(userId: $userId) {
			_id
			name
		}
	}
`

const UserListsPage = () => {
	const { viewer } = useViewer()
	const { loading, data, error } = useQuery(USER_LISTS_QUERY, {
		variables: { userId: viewer._id },
	})

	if (loading) return <LoadingState />
	if (error) return <Typography color="error">Error occurred</Typography>

	return (
		<div>
			<Typography variant="h3">My Lists</Typography>
			{!data.userLists.length ? (
				<Typography color="error">No Lists Found</Typography>
			) : (
				data.userLists.map(list => (
					<Card key={list._id}>
						<CardContent>
							<Typography>ID: {list._id}</Typography>
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

export default UserListsPage
