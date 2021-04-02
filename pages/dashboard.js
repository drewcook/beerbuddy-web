import Head from 'next/head'
import Link from 'next/link'
import { useQuery, gql } from '@apollo/client'
import { Box, Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import LoadingState from '~/components/LoadingState'
import { useViewer } from '~/components/ViewerContext'
import _get from 'lodash/get'
import baseStyles from '~/styles/base.module.scss'
import styles from '~/styles/dashboard.module.scss'
import CreateListDialog from '~/components/CreateListDialog'

export const USER_DASHBOARD_QUERY = gql`
	query GetUserDashboard($userId: ID!) {
		userDashboard(userId: $userId) {
			userName
			lists {
				_id
				name
				dateCreated
			}
		}
	}
`

const DashboardPage = () => {
	const { viewer } = useViewer()
	const { loading, data, error } = useQuery(USER_DASHBOARD_QUERY, {
		variables: { userId: viewer._id },
	})
	const details = _get(data, 'userDashboard')

	if (loading) return <LoadingState />
	if (error) return <Typography color="error">Error occurred</Typography>

	return (
		<>
			<Head>
				<title>BeerBuddy - My Dashboard</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				My Dashboard
			</Typography>

			<Typography variant="h5" gutterBottom>
				Hello, {details.userName}!
			</Typography>

			<Grid container spacing={3}>
				<Grid item md={6}>
					<Paper className={styles.paper}>
						<Typography variant="h4">My Lists</Typography>
						<List>
							<ListItem>Total: {details.lists.length}</ListItem>
						</List>
						{details.lists.map(list => (
							<Box key={list._id}>
								<Link href={`/user/list/${list._id}`}>
									<a>
										<Typography>{list.name}</Typography>
									</a>
								</Link>
								<Typography>
									<em>Created on:{list.dateCreated}</em>
								</Typography>
								<hr />
							</Box>
						))}
						<CreateListDialog onRefetch={USER_DASHBOARD_QUERY} />
					</Paper>
					<Paper className={styles.paper}>
						<Typography variant="h4">My Favorites</Typography>
						<List>
							<ListItem>Odell Imperial IPA</ListItem>
							<ListItem>Pelican Brewing Company</ListItem>
							<ListItem>New Image Brewery</ListItem>
							<ListItem>My Super Sour List</ListItem>
						</List>
					</Paper>
				</Grid>
				<Grid item md={6}>
					<Paper className={styles.paper}>
						<Typography variant="h4">My Stats</Typography>
						<List>
							<ListItem>Beers Logged: x</ListItem>
							<ListItem>Brewery Check Ins: x</ListItem>
						</List>
					</Paper>
					<Paper className={styles.paper}>
						<Typography variant="h4">Recent History</Typography>
					</Paper>
				</Grid>
			</Grid>
		</>
	)
}

export default DashboardPage
