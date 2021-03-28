import Head from 'next/head'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import Link from 'next/link'
import { useAuthentication } from '../../components/AuthenticationContext'
import styles from '../../styles/beerlist.module.scss'
import { getBeers } from '../../api/breweryDb'

const BeerListPage = props => {
	const { list, page, totalPages, totalResults } = props
	const { isAuthenticated } = useAuthentication()

	if (!isAuthenticated) console.log("uh oh, you shouldn'nt be here")

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<Typography variant="h3">Beer List</Typography>
				{list.map(beer => (
					<Card className={styles.card} key={beer.id}>
						<CardContent>
							<Typography variant="h5">{beer.nameDisplay}</Typography>
						</CardContent>
						<CardActions>
							<Link href={`/beer/${beer.id}`}>
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
	const resp = await getBeers(page)
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

export default BeerListPage
