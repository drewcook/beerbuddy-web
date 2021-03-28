import Head from 'next/head'
import { Button, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useAuthentication } from '../components/AuthenticationContext'
import styles from '../styles/home.module.scss'

const HomePage = () => {
	const { isAuthenticated } = useAuthentication()

	return (
		<div className={styles.container}>
			<Head>
				<title>BeerBuddy - Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<Typography variant="h2">Welcome to BeerBuddy!</Typography>

				<Typography>We keep track of your drinking habits so you don't have to! Cheers!</Typography>

				{isAuthenticated && (
					<Typography variant="subtitle1">
						You can now go to your dashboard to create and manage your lists.
					</Typography>
				)}

				{isAuthenticated ? (
					<Link href="/dashboard">
						<a>
							<Button color="primary" size="large" variant="contained">
								My Dashboard
							</Button>
						</a>
					</Link>
				) : (
					<Link href="/login">
						<a>
							<Button color="primary" size="large" variant="contained">
								Sign In
							</Button>
						</a>
					</Link>
				)}
			</main>

			<footer className={styles.footer}>
				<a href="https://altheawebservices.com" target="_blank" rel="noopener noreferrer">
					Built by Althea Web Services
				</a>
			</footer>
		</div>
	)
}

export default HomePage
