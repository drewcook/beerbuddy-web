import { useLazyQuery, useMutation } from '@apollo/client'
import { Grid, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import {
	BREWERY_LIST_QUERY,
	FILTER_BY_COUNTRY_MUTATION,
	FILTER_BY_STATE_MUTATION,
} from '@bb/lib/apollo-client/schemas'
import BreweryCard from '@bb/components/BreweryCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import FilterBar from '@bb/components/common/FilterBar'
import requiresAuthentication from '@bb/components/requiresAuthentication'

const BreweryListPage = ({ me }) => {
	const [page, setPage] = useState(1)
	const [getBreweries, { data, loading, error }] = useLazyQuery(BREWERY_LIST_QUERY, {
		variables: { page },
	})
	const [filterByCountry, { data: cData, loading: cLoading, error: cError }] = useMutation(
		FILTER_BY_COUNTRY_MUTATION,
	)
	const [filterByState, { data: sData, loading: sLoading, error: sError }] = useMutation(
		FILTER_BY_STATE_MUTATION,
	)

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

	const handleFilter = async ({ country, state }) => {
		if (country !== '') {
			try {
				await filterByCountry({ variables: { input: { page: 1, country } } })
			} catch (ex) {
				console.error(ex)
			}
		}

		if (state !== '') {
			try {
				await filterByState({ variables: { input: { page: 1, state } } })
			} catch (ex) {
				console.error(ex)
			}
		}
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
		if (loading || cLoading || sLoading) return <LoadingState />

		if (error || cError || sError)
			return (
				<Typography color="error">Sorry, an error occurred while getting the results.</Typography>
			)

		if (cData) {
			const filteredCountryData = _get(cData, 'filterByCountry', [])
			console.log('got filtered country data', filteredCountryData)
		}

		if (sData) {
			const filteredStateData = _get(sData, 'filterByState', [])
			console.log('got filtered state data', filteredStateData)
		}

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
				<title>BeerBuddy - Brewery List</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<PageTitle title="Brewery List" headline="Browse Breweries" />
			<FilterBar onFilter={handleFilter} />
			{renderContent()}
		</>
	)
}

export default requiresAuthentication(BreweryListPage)
