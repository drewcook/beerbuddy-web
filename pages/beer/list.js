import { useQuery } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import { useState } from 'react'
import { BEER_LIST_QUERY } from '@bb/lib/apollo-client/shemas'
import BeerCard from '@bb/components/BeerCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'

// These beer IDs are causing 404s when fetching thier details from BreweryDB
const BUGGY_BEER_IDS = ['p1tFbP']

const BeerListPage = () => {
	const { data, loading, error } = useQuery(BEER_LIST_QUERY, { variables: { page: 1 } })
	const results = _get(data, 'beerList')
	const pageInfo = {
		currentPage: _get(results, 'currentPage', 0),
		numberOfPages: _get(results, 'numberOfPages', 0),
		totalResults: _get(results, 'totalResults', 0),
	}

	const handlePrevPage = async () => {
		// 	if (pageInfo.page === 1) return
		// 	if (error) setError(null)
		// 	setLoading(true)
		// 	try {
		// 		const resp = await breweryDbService.getBeers(pageInfo.page - 1)
		// 		const { data, currentPage, numberOfPages, totalResults } = resp
		// 		setResults(data)
		// 		setPageInfo({
		// 			page: currentPage,
		// 			totalPages: numberOfPages,
		// 			totalResults,
		// 		})
		// 		setLoading(false)
		// 	} catch (ex) {
		// 		setError('An error occurred while getting results.')
		// 		setLoading(false)
		// 		console.error(ex)
		// 	}
	}

	const handleNextPage = async () => {
		// 	if (pageInfo.page === pageInfo.numberOfPages) return
		// 	if (error) setError(null)
		// 	setLoading(true)
		// 	try {
		// 		const resp = await breweryDbService.getBeers(pageInfo.page + 1)
		// 		const { data, currentPage, numberOfPages, totalResults } = resp
		// 		setResults(data)
		// 		setPageInfo({
		// 			page: currentPage,
		// 			totalPages: numberOfPages,
		// 			totalResults,
		// 		})
		// 		setLoading(false)
		// 	} catch (ex) {
		// 		setError('An error occurred while getting results.')
		// 		setLoading(false)
		// 		console.error(ex)
		// 	}
	}

	if (loading) return <LoadingState />
	if (error)
		return (
			<Typography color="error">Sorry, an error occurred while getting the results.</Typography>
		)

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Beer List" headline="Search Beer" />

			<ListPagination pageInfo={pageInfo} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />

			<Grid container spacing={3}>
				{results.data
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

export default BeerListPage
