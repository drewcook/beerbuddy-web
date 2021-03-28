import Head from 'next/head'
import { Grid, List, ListItem, Paper, Typography } from '@material-ui/core'
import baseStyles from '../styles/base.module.scss'
import styles from '../styles/dashboard.module.scss'

const DashboardPage = props => (
	<>
		<Head>
			<title>BeerBuddy - My Dashboard</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Typography variant="h3" className={baseStyles.pageTitle}>
			My Dashboard
		</Typography>

		<Grid container spacing={3}>
			<Grid item md={6}>
				<Paper className={styles.paper}>
					<Typography variant="h4">My Lists</Typography>
					<List>
						<ListItem>Total: x</ListItem>
						<ListItem>Recentl Updated: x</ListItem>
					</List>
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

export default DashboardPage
