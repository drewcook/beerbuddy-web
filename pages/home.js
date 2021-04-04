import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/home.module.scss'
import { Button, Card, CardActions, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'

const HomePage = () => (
	<div className={styles.centered}>
		<Head>
			<title>BeerBuddy - Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Typography variant="h2" component="h3" className={baseStyles.pageTitle}>
			Welcome to BeerBuddy!
		</Typography>

		<Typography variant="h6">
			We keep track of your drinking habits so you don't have to! Cheers!
		</Typography>

		<Card className={[styles.centered, styles.card].join(' ')}>
			<Typography variant="h5" gutterBottom>
				Now What?
			</Typography>
			<Typography variant="subtitle1">
				You can now go to your dashboard to create and manage your lists.
			</Typography>
			<CardActions>
				<Link href="/dashboard">
					<a>
						<Button color="primary" size="large" variant="contained" className={styles.btn}>
							My Dashboard
						</Button>
					</a>
				</Link>
			</CardActions>
		</Card>
	</div>
)

export default HomePage
