import { Grid, Typography } from '@material-ui/core'
import Head from 'next/head'
import * as breweryDbService from '@bb/api/breweryDb'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import BeerCard from '@bb/components/BeerCard'
import ListPagination from '@bb/components/ListPagination'
import PageTitle from '@bb/components/PageTitle'

// These beer IDs are causing 404s when fetching thier details from BreweryDB
const BUGGY_BEER_IDS = ['p1tFbP']

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

			<PageTitle title="Beer List" headline="Search Beer" />
			<Typography>{totalResults} results</Typography>

			<ListPagination pageInfo={{ page, totalPages }} />

			<Grid container spacing={3}>
				{list
					.filter(b => !BUGGY_BEER_IDS.includes(b.id))
					.map(beer => (
						<Grid item xs={12} sm={6} md={4} key={beer.id}>
							<BeerCard beer={beer} />
						</Grid>
					))}
			</Grid>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const page = 1
	const resp = await breweryDbService.getBeers(page)
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
