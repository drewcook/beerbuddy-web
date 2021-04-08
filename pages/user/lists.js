import { useQuery } from '@apollo/client'
import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import Link from 'next/link'
import { USER_LISTS_QUERY } from '@bb/lib/apollo-client/shemas'
import { formatDate } from '@bb/lib/dateUtils'
import CreateListDialog from '@bb/components/CreateListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import { useViewer } from '@bb/components/ViewerContext'
import baseStyles from '@bb/styles/base.module.scss'

const UserListsPage = () => {
	const { viewer } = useViewer()
	const { loading, data, error } = useQuery(USER_LISTS_QUERY, {
		variables: { userId: viewer._id },
	})

	if (loading) return <LoadingState />
	if (error)
		return <Typography color="error">Sorry, an error occurred getting user lists.</Typography>

	return (
		<div>
			<PageTitle title="User Lists" headline="My Lists" />

			{data.userLists.length && (
				<Box mb={3}>
					<CreateListDialog />
				</Box>
			)}

			{!data.userLists.length ? (
				<Box className={baseStyles.centered}>
					<Typography>
						<em>No Lists Found</em>
					</Typography>
					<CreateListDialog />
				</Box>
			) : (
				data.userLists.map(list => (
					<Card key={list._id} className={baseStyles.cardBase}>
						<CardContent>
							<Typography variant="h4" gutterBottom>
								{list.name}
							</Typography>
							<Typography variant="subtitle1">
								<em>Created {formatDate(list.dateCreated)}</em>
							</Typography>
							<Typography variant="subtitle2">Beer Count: {list.beerIds.length}</Typography>
							<Typography variant="subtitle2">Brewery Count: {list.breweryIds.length}</Typography>
						</CardContent>
						<CardActions>
							<Link href={`/user/list/${list._id}`}>
								<a>
									<Button variant="contained" color="primary">
										View Details
									</Button>
								</a>
							</Link>
						</CardActions>
					</Card>
				))
			)}
		</div>
	)
}

export default UserListsPage
