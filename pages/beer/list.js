import { useLazyQuery } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { BEER_LIST_QUERY } from '@bb/lib/apollo-client/schemas'
import BeerCard from '@bb/components/BeerCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'

// These beer IDs are causing 404s when fetching thier details from BreweryDB
const BUGGY_BEER_IDS = ['p1tFbP', 'BznahA']

const BeerListPage = ({ me }) => {
	const [page, setPage] = useState(1)
	const [getBeer, { data, loading, error }] = useLazyQuery(BEER_LIST_QUERY, { variables: { page } })
	const results = _get(data, 'beerList.data', [])
	const pageInfo = {
		currentPage: _get(data, 'beerList.currentPage', 0),
		numberOfPages: _get(data, 'beerList.numberOfPages', 0),
		totalResults: _get(data, 'beerList.totalResults', 0),
	}

	const handlePrevPage = async () => {
		if (page === 1) return
		setPage(page - 1)
	}

	const handleNextPage = async () => {
		if (page === pageInfo.numberOfPages) return
		setPage(page + 1)
	}

	const handleGetBeer = async () => {
		try {
			await getBeer()
		} catch (ex) {
			console.error(ex)
		}
	}

	useEffect(async () => {
		await handleGetBeer()
	}, [])

	useEffect(async () => {
		await handleGetBeer()
	}, [page])

	const renderContent = () => {
		if (loading) return <LoadingState />

		if (error)
			return (
				<Typography color="error">Sorry, an error occurred while getting the results.</Typography>
			)

		return (
			<>
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
								<BeerCard beer={beer} userId={me._id} />
							</Grid>
						))}
				</Grid>
				<ListPagination
					pageInfo={pageInfo}
					onPrevPage={handlePrevPage}
					onNextPage={handleNextPage}
				/>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer List</title>
			</Head>
			<PageTitle title="Beer List" headline="Browse Beer" />
			{renderContent()}
		</>
	)
}

export default requiresAuthentication(BeerListPage)
