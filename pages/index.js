import { Button, Card, CardActions, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import nookies from 'nookies'
import { useEffect, useState } from 'react'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import styles from '@bb/styles/home.module.scss'

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
			<div className={styles.homeCentered}>
				<Head>
					<title>BeerBuddy - Welcome!</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<PageTitle title="" headline="Welcome to BeerBuddy!" />
				<Typography variant="h6">
					We keep track of your drinking habits so you don't have to!
				</Typography>
				<Typography>
					You can search through our data of beer and breweries and create lists for yourself to
					keep a journal of your drinking journey. There are so many beers out there, so why not
					create a list of one you'd like to try? Or how about breweries you'd like to visit? And
					we've all had a beer or two we wouldn't try again. Sky's the limit for how you like roll!
				</Typography>
				<Card className={[styles.homeCentered, styles.card].join(' ')}>
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
		<div className={styles.homeCentered}>
			<Head>
				<title>BeerBuddy - Welcome!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<LoadingState />
		</div>
	)
}

export const getServerSideProps = async ctx => {
	const { authToken } = nookies.get(ctx)

	if (authToken) {
		// Logged in users shouldn't see this page.
		// We should redirect to their home page.
		return {
			redirect: {
				permanent: false,
				destination: '/home',
			},
		}
	}

	return { props: {} }
}

export default WelcomePage
