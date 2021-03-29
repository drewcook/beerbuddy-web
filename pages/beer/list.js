import Head from 'next/head'
import { Grid, Typography } from '@material-ui/core'
import { useAuthentication } from '../../components/AuthenticationContext'
import { breweryDbService } from '../../api/'
import BeerCard from '../../components/BeerCard'
import baseStyles from '../../styles/base.module.scss'

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
