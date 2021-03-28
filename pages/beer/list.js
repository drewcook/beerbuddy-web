import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { useAuthentication } from '../../components/AuthenticationContext'
import { getBeers } from '../../api/breweryDb'
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

			{list.map(beer => (
				<BeerCard beer={beer} key={beer.id} />
			))}
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
