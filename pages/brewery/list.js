import { Grid } from '@material-ui/core'
import Head from 'next/head'
import BreweryCard from '@bb/components/BreweryCard'
import ListPagination from '@bb/components/ListPagination'
import PageTitle from '@bb/components/PageTitle'

const BreweryListPage = () => {
	return null
	return (
		<>
			<Head>
				<title>BeerBuddy - Brewery List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Brewery List" headline="Search Breweries" />

			<ListPagination pageInfo={{ page, totalPages }} />

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

export default BreweryListPage
