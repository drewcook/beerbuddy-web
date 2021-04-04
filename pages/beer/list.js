import { breweryDbService } from '@bb/api/'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import BeerCard from '@bb/components/BeerCard'
import baseStyles from '@bb/styles/base.module.scss'
import { Grid, Typography } from '@material-ui/core'
import Head from 'next/head'

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

			<Typography variant="h3" className={baseStyles.pageTitle}>
				Beer List
			</Typography>

			<Grid container spacing={3}>
				{list.map(beer => (
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
