import { Grid } from '@material-ui/core'
import Head from 'next/head'
import { getBreweries } from '@bb/api/breweryDb'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import BreweryCard from '@bb/components/BreweryCard'
import PageTitle from '@bb/components/PageTitle'

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

			<PageTitle title="Brewery List" headline="Search Breweries" />

			<Grid container spacing={3}>
				{list.map(brewery => (
					<Grid item xs={12} sm={6} md={4} key={brewery.id}>
						<BreweryCard brewery={brewery} />
					</Grid>
				))}
			</Grid>
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
