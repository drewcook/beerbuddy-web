import Head from 'next/head'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useAuthentication } from '../../components/AuthenticationContext'
import styles from '../../styles/list.module.scss'
import { getBreweries } from '../../api/breweryDb'

const BreweryListPage = props => {
	const { list, page, totalPages, totalResults } = props
	const { isAuthenticated } = useAuthentication()

	if (!isAuthenticated) console.log("uh oh, you shouldn'nt be here")

	return (
		<>
			<Head>
				<title>BeerBuddy - Brewery List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Typography variant="h3">Brewery List</Typography>
				{list.map(brewery => (
					<Card className={styles.card} key={brewery.id}>
						<CardContent>
							<Typography variant="h5">{brewery.name}</Typography>
						</CardContent>
						<CardActions>
							<Link href={`/brewery/${brewery.id}`}>
								<a>
									<Button variant="contained" color="primary" size="small">
										View More Details
									</Button>
								</a>
							</Link>
						</CardActions>
					</Card>
				))}
			</main>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const page = 1
	const resp = await getBreweries(page)
	const { data, currentPage, numberOfPages, totalResults } = resp

	return {
		props: {
			list: data,
			page: currentPage,
			totalPages: numberOfPages,
			totalResults,
		},
	}
}

export default BreweryListPage
