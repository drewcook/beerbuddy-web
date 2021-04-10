import { useQuery } from '@apollo/client'
import {
	Box,
	Divider,
	Grid,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import { USER_DASHBOARD_QUERY } from '@bb/lib/apollo-client/schemas'
import { formatDate } from '@bb/lib/dateUtils'
import CreateListDialog from '@bb/components/CreateListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import { useViewer } from '@bb/components/ViewerContext'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/dashboard.module.scss'

const DashboardPage = () => {
	const { viewer } = useViewer()
	const { loading, data, error } = useQuery(USER_DASHBOARD_QUERY, {
		variables: { userId: viewer._id },
	})
	const details = _get(data, 'userDashboard')
	const favorites = _get(viewer, 'favorites')

	const renderFavoriteItem = favorite => {
		if (!favorite) return

		const url =
			favorite.type === 'list'
				? `/user/list/${favorite.itemId}`
				: `/${favorite.type}/${favorite.itemId}`

		return (
			<Box key={favorite._id} className={styles.favoriteItem}>
				<Link href={url}>
					<a>
						<ListItem key={favorite._id} divider>
							<ListItemText
								primary={favorite.name}
								secondary={favorite.type}
								secondaryTypographyProps={{ variant: 'overline' }}
							/>
						</ListItem>
					</a>
				</Link>
			</Box>
		)
	}

	if (loading) return <LoadingState />
	if (error)
		return (
			<Typography color="error">
				Sorry, an error occurred while getting the user dashboard.
			</Typography>
		)

	return (
		<>
			<Head>
				<title>BeerBuddy - My Dashboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="My Dashboard" headline={`Hello, ${details.userName}!`} />

			<Grid container spacing={3}>
				<Grid item xs={12} md={6}>
					<Paper className={styles.paper}>
						<Box display="flex" alignItems="baseline" mb={3} className={styles.listsHeader}>
							<Typography variant="h4" gutterBottom>
								My Lists
							</Typography>
							<Divider />
							<Typography variant="overline">{details.lists.length} total</Typography>
						</Box>
						{details.lists.map(list => (
							<Box key={list._id} className={styles.listItem}>
								<Link href={`/user/list/${list._id}`}>
									<a>
										<Typography variant="h6">{list.name}</Typography>
									</a>
								</Link>
								<Typography variant="overline">
									<em>Created on: {formatDate(list.dateCreated)}</em>
								</Typography>
								<Divider />
							</Box>
						))}
						<Box display="flex" justifyContent="flex-end">
							<CreateListDialog />
						</Box>
					</Paper>
					<Paper className={styles.paper}>
						<Typography variant="h4" gutterBottom>
							My Favorites
						</Typography>
						<Divider />
						{favorites.length > 0 ? (
							<List>{favorites.map(fav => renderFavoriteItem(fav))}</List>
						) : (
							<Box className={baseStyles.centered} my={3}>
								<Typography>
									<em>Nothing to show! You can favorite items from their details page.</em>
								</Typography>
							</Box>
						)}
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
					<Paper className={styles.paper}>
						<Typography variant="h4" gutterBottom>
							My Stats
						</Typography>
						<Divider />
						<Box className={baseStyles.centered} my={3}>
							<Typography>
								<em>Coming soon...</em>
							</Typography>
						</Box>
					</Paper>
					<Paper className={styles.paper}>
						<Typography variant="h4" gutterBottom>
							Recent History
						</Typography>
						<Divider />
						<Box className={baseStyles.centered} my={3}>
							<Typography>
								<em>Coming soon...</em>
							</Typography>
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default DashboardPage
