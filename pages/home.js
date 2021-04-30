import { Button, Card, CardActions, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'
import styles from '@bb/styles/home.module.scss'

const HomePage = () => (
	<div className={styles.homeCentered}>
		<Head>
			<title>BeerBuddy - Home</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<PageTitle title="" headline="Welcome to BeerBuddy!" />

		<Typography variant="h6">
			We keep track of your drinking habits so you don't have to! Cheers!
		</Typography>

		<Card className={[styles.homeCentered, styles.card].join(' ')}>
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

export default requiresAuthentication(HomePage)
