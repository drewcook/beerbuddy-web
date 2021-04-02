import Head from 'next/head'
import { Button, Card, CardActions, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useAuthentication } from '~/components/AuthenticationContext'
import styles from '~/styles/home.module.scss'
import baseStyles from '~/styles/base.module.scss'

const HomePage = () => {
	const { isAuthenticated } = useAuthentication()

	return (
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

			{isAuthenticated ? (
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
			) : (
				<Card className={[styles.centered, styles.card].join(' ')}>
					<Typography variant="h5" gutterBottom>
						Get Started
					</Typography>
					<Typography variant="subtitle1">
						Sign into your account, or create a new one to get started.
					</Typography>
					<CardActions>
						<Link href="/login">
							<a>
								<Button color="primary" size="large" variant="contained" className={styles.btn}>
									Sign In
								</Button>
							</a>
						</Link>
					</CardActions>
				</Card>
			)}
		</div>
	)
}

export default HomePage
