import { useEffect, useState } from 'react'
import Head from 'next/head'
import { Button, Card, CardActions, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useAuthentication } from '~/components/AuthenticationContext'
import styles from '~/styles/home.module.scss'
import baseStyles from '~/styles/base.module.scss'
import LoadingState from '~/components/LoadingState'

const WelcomePage = () => {
	const router = useRouter()
	const [loading, setLoading] = useState(true)
	const { isAuthenticated } = useAuthentication()

	useEffect(() => {
		if (isAuthenticated !== null) setLoading(false)
	}, [isAuthenticated])

	if (isAuthenticated) router.replace('/home')

	if (loading) return <LoadingState />

	if (isAuthenticated === false) {
		return (
			<div className={styles.centered}>
				<Head>
					<title>BeerBuddy - Welcome!</title>
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
			</div>
		)
	}

	return (
		<div className={styles.centered}>
			<Head>
				<title>BeerBuddy - Welcome!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<LoadingState />
		</div>
	)
}

export default WelcomePage
