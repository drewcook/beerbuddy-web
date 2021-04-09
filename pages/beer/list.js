import { Grid, Typography } from '@material-ui/core'
import Head from 'next/head'
import { useState } from 'react'
import * as breweryDbService from '@bb/api/breweryDb'
import BeerCard from '@bb/components/BeerCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'

// These beer IDs are causing 404s when fetching thier details from BreweryDB
const BUGGY_BEER_IDS = ['p1tFbP']

const BeerListPage = props => {
	const { list, page, totalPages, totalResults } = props
	const [pageInfo, setPageInfo] = useState({
		page,
		totalPages,
		totalResults,
	})
	const [results, setResults] = useState(list)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const handlePrevPage = async () => {
		if (pageInfo.page === 1) return
		if (error) setError(null)
		setLoading(true)

		try {
			const resp = await breweryDbService.getBeers(pageInfo.page - 1)
			const { data, currentPage, numberOfPages, totalResults } = resp
			setResults(data)
			setPageInfo({
				page: currentPage,
				totalPages: numberOfPages,
				totalResults,
			})
			setLoading(false)
		} catch (ex) {
			setError('An error occurred while getting results.')
			setLoading(false)
			console.error(ex)
		}
	}

	const handleNextPage = async () => {
		if (pageInfo.page === pageInfo.numberOfPages) return
		if (error) setError(null)
		setLoading(true)

		try {
			const resp = await breweryDbService.getBeers(pageInfo.page + 1)
			const { data, currentPage, numberOfPages, totalResults } = resp
			setResults(data)
			setPageInfo({
				page: currentPage,
				totalPages: numberOfPages,
				totalResults,
			})
			setLoading(false)
		} catch (ex) {
			setError('An error occurred while getting results.')
			setLoading(false)
			console.error(ex)
		}
	}

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Beer List" headline="Search Beer" />

			{error && <Typography color="error">{error}</Typography>}

			{loading ? (
				<LoadingState />
			) : (
				<>
					<Typography>{totalResults} results</Typography>

					<ListPagination
						pageInfo={pageInfo}
						onPrevPage={handlePrevPage}
						onNextPage={handleNextPage}
					/>

					<Grid container spacing={3}>
						{results
							.filter(b => !BUGGY_BEER_IDS.includes(b.id))
							.map(beer => (
								<Grid item xs={12} sm={6} md={4} key={beer.id}>
									<BeerCard beer={beer} />
								</Grid>
							))}
					</Grid>
				</>
			)}
		</>
	)
}

export const getServerSideProps = async ctx => {
	const page = 5
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
