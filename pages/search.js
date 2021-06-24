import { useMutation } from '@apollo/client'
import { Box, Grid, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { SEARCH_BREWERYDB_MUTATION } from '@bb/lib/apollo-client/schemas'
import BeerCard from '@bb/components/BeerCard'
import BreweryCard from '@bb/components/BreweryCard'
import ListPagination from '@bb/components/ListPagination'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import SearchBar from '@bb/components/common/SearchBar'
import requiresAuthentication from '@bb/components/requiresAuthentication'

const SearchPage = ({ me }) => {
	const [page, setPage] = useState(1)
	const [query, setQuery] = useState('')
	const [search, { data, loading, error, called }] = useMutation(SEARCH_BREWERYDB_MUTATION)
	const results = _get(data, 'searchBreweryDb.data', [])
	const pageInfo = {
		currentPage: _get(data, 'searchBreweryDb.currentPage', 0),
		numberOfPages: _get(data, 'searchBreweryDb.numberOfPages', 0),
		totalResults: _get(data, 'searchBreweryDb.totalResults', 0),
	}

	const handlePrevPage = async () => {
		if (page === 1) return
		const newPage = page - 1
		await setPage(newPage)
		await handleGetSearch(query, newPage)
	}

	const handleNextPage = async () => {
		if (page === pageInfo.numberOfPages) return
		const newPage = page + 1
		await setPage(newPage)
		await handleGetSearch(query, newPage)
	}

	const handleGetSearch = async (q, pageQ = page) => {
		setQuery(q)
		try {
			await search({ variables: { input: { page: pageQ, query: q } } })
		} catch (ex) {
			console.error(ex)
		}
	}

	const renderContent = () => {
		if (loading) return <LoadingState />

		if (error)
			return (
				<Typography color="error">Sorry, an error occurred while getting the results.</Typography>
			)

		return (
			<>
				{called && (
					<ListPagination
						pageInfo={pageInfo}
						onPrevPage={handlePrevPage}
						onNextPage={handleNextPage}
					/>
				)}
				<Grid container spacing={3}>
					{results.length > 0 ? (
						results.map(item => (
							<Grid item xs={12} sm={6} md={4} key={item.id}>
								{item.__typename === 'Beer' && <BeerCard beer={item} userId={me._id} />}
								{item.__typename === 'Brewery' && <BreweryCard brewery={item} userId={me._id} />}
							</Grid>
						))
					) : (
						<Grid item xs={12}>
							<Box justifyContent="center" alignItems="center" my={2} textAlign="center">
								{called ? (
									<Typography>Nothing found. Try searching for something less specific!</Typography>
								) : (
									<Typography>
										Try searching for a beer or brewery. Use any keywords like the brewery name,
										beer type, or even a location. You will be searching across the entire dataset
										of beers and breweries.
									</Typography>
								)}
							</Box>
						</Grid>
					)}
				</Grid>
				{called && (
					<ListPagination
						pageInfo={pageInfo}
						onPrevPage={handlePrevPage}
						onNextPage={handleNextPage}
					/>
				)}
			</>
		)
	}

	return (
		<>
			<Head>
				<title>BeerBuddy - Search List</title>
			</Head>

			<PageTitle title="Search List" headline="Search All Beer and Breweries" />
			<SearchBar onSearch={handleGetSearch} />

			{renderContent()}
		</>
	)
}

export default requiresAuthentication(SearchPage)
