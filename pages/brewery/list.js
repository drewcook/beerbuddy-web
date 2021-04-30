import { useLazyQuery } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { BREWERY_LIST_QUERY } from '@bb/lib/apollo-client/schemas'
import BreweryCard from '@bb/components/BreweryCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'

const BreweryListPage = ({ me }) => {
	const [page, setPage] = useState(1)
	const [getBreweries, { data, loading, error }] = useLazyQuery(BREWERY_LIST_QUERY, {
		variables: { page },
	})

	const results = _get(data, 'breweryList.data', [])
	const pageInfo = {
		currentPage: _get(data, 'breweryList.currentPage', 0),
		numberOfPages: _get(data, 'breweryList.numberOfPages', 0),
		totalResults: _get(data, 'breweryList.totalResults', 0),
	}

	const handlePrevPage = async () => {
		if (page === 1) return
		setPage(page - 1)
	}

	const handleNextPage = async () => {
		if (page === pageInfo.numberOfPages) return
		setPage(page + 1)
	}

	useEffect(async () => {
		try {
			await getBreweries()
		} catch (ex) {
			console.error(ex)
		}
	}, [])

	useEffect(async () => {
		try {
			await getBreweries()
		} catch (ex) {
			console.error(ex)
		}
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
					{results.map(brewery => (
						<Grid item xs={12} sm={6} md={4} key={brewery.id}>
							<BreweryCard brewery={brewery} userId={me._id} />
						</Grid>
					))}
				</Grid>
			</>
		)
	}

	return (
		<>
			<Head>
				<title>BeerBuddy - Brewery List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Brewery List" headline="Search Breweries" />
			{renderContent()}
		</>
	)
}

export default requiresAuthentication(BreweryListPage)
