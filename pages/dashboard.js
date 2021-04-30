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
import { formatDate, formatDateName } from '@bb/lib/dateUtils'
import CreateListDialog from '@bb/components/CreateListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/dashboard.module.scss'

const DashboardPage = ({ me }) => {
	const { loading, data, error } = useQuery(USER_DASHBOARD_QUERY, {
		variables: { userId: me._id },
		skip: !me._id,
	})
	const details = _get(data, 'userDashboard')
	const favorites = _get(me, 'favorites')

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

			<Box mt={-2} mb={4}>
				<Typography>
					<em>Quenching thirsts on BeerBuddy since {formatDateName(me.dateCreated)}.</em>
				</Typography>
			</Box>

			<Grid container spacing={3}>
				<Grid item xs={12} sm={6}>
					<Paper className={styles.paper}>
						<Typography variant="h4" gutterBottom>
							My Stats
						</Typography>
						<Divider />
						<List>
							<ListItem divider>
								<ListItemText
									primary="Lists Created"
									secondary={`${details.lists.length} total`}
									primaryTypographyProps={{
										variant: 'h6',
									}}
									secondaryTypographyProps={{
										variant: 'overline',
									}}
								/>
							</ListItem>
							<ListItem divider>
								<ListItemText
									primary="Favorite Items"
									secondary={`${favorites.length} total • ${
										favorites.filter(f => f.type === 'beer').length
									} beer • ${favorites.filter(f => f.type === 'brewery').length} breweries • ${
										favorites.filter(f => f.type === 'list').length
									} lists`}
									primaryTypographyProps={{
										variant: 'h6',
									}}
									secondaryTypographyProps={{
										variant: 'overline',
									}}
								/>
							</ListItem>
						</List>
					</Paper>
					<Paper className={styles.paper}>
						<Typography variant="h4" gutterBottom>
							My Favorites
						</Typography>
						<Divider />
						{favorites.length > 0 ? (
							<List>{favorites.map(fav => renderFavoriteItem(fav))}</List>
						) : (
							<Box className={baseStyles.centered} my={3} textAlign="center">
								<Typography>
									<em>
										Nothing to show!
										<br />
										You can favorite items from their details page.
									</em>
								</Typography>
							</Box>
						)}
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
				<Grid item xs={12} sm={6}>
					<Paper className={styles.paper}>
						<Box display="flex" alignItems="baseline" className={styles.listsHeader}>
							<Typography variant="h4" gutterBottom>
								My Lists
							</Typography>
							<Typography variant="overline">{details.lists.length} total</Typography>
						</Box>
						<Divider />
						{details.lists.length > 0 ? (
							details.lists.map(list => (
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
							))
						) : (
							<Box className={baseStyles.centered} my={3}>
								<Typography>
									<em>You don't have any lists yet. Create some!</em>
								</Typography>
							</Box>
						)}
						<CreateListDialog boxProps={{ mt: 3 }} btnProps={{ fullWidth: true }} userId={me._id} />
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default requiresAuthentication(DashboardPage)
