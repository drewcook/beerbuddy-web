import Head from 'next/head'
import { Grid, Typography } from '@material-ui/core'
import { useAuthentication } from '../../components/AuthenticationContext'
import { getBreweries } from '../../api/breweryDb'
import BreweryCard from '../../components/BreweryCard'
import baseStyles from '../../styles/base.module.scss'

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

			<Typography variant="h3" className={baseStyles.pageTitle}>
				Brewery List
			</Typography>

			<Grid container spacing={3}>
				{list.map(brewery => (
					<Grid item xs={12} sm={6} md={4}>
						<BreweryCard brewery={brewery} key={brewery.id} />
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
