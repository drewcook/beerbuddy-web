import { useQuery, gql } from '@apollo/client'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { formatDate } from '@bb/lib/dateUtils'
import getErrors from '@bb/lib/getGraphQLErrors'
import LoadingState from '@bb/components/LoadingState'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/listDetails.module.scss'

const LIST_DETAILS_QUERY = gql`
	query GetListDetails($listId: ID!) {
		listDetails(listId: $listId) {
			name
			dateCreated
			dateLastModified
			beerItems {
				id
				name
				abv
				ibu
				isOrganic
				style {
					shortName
					category {
						name
					}
				}
			}
			breweryItems {
				id
				name
				isOrganic
				locations {
					locality
					region
					country {
						displayName
					}
				}
			}
		}
	}
`

const UserListDetailsPage = ({ id }) => {
	const [itemToRemove, setItemToRemove] = useState(null)
	const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
	const { data, loading, error } = useQuery(LIST_DETAILS_QUERY, {
		variables: { listId: id },
		fetchPolicy: 'no-cache',
	})
	const removeLoading = false
	const removeError = false
	const details = _get(data, 'listDetails')

	const handleOpenRemoveDialog = item => {
		setItemToRemove(item)
		setRemoveDialogOpen(true)
	}

	const handleCloseRemoveDialog = () => {
		setItemToRemove(null)
		setRemoveDialogOpen(false)
	}

	const handleRemoveFromList = () => {
		// TODO: make mutation
		console.log('removing...', itemToRemove)
	}

	if (loading) return <LoadingState />
	if (error) return <Typography color="error">{getErrors(error)}</Typography>

	const renderBeerItem = (key, beer) => {
		const subLine = () => {
			const abv = beer.abv ? ` • ${beer.abv}% ABV` : ''
			const ibu = beer.ibu ? ` • ${beer.ibu}% IBU` : ''

			return `${beer.style?.category?.name}${abv}${ibu}`
		}

		return (
			<ListItem key={key} divider>
				<Link href={`/beer/${beer.id}`}>
					<a>
						<ListItemText primary={beer.name} secondary={subLine()} />
					</a>
				</Link>
				<ListItemSecondaryAction onClick={() => handleOpenRemoveDialog(beer)}>
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}

	const renderBreweryItem = (key, brewery) => {
		const location = () => {
			if (brewery.locations.length < 1) return ''
			const [main] = brewery.locations
			const isUSBased = main.country.displayName === 'United States'
			const region = main.region ? `, ${main.region}` : ''
			const primaryLocation = `${main.locality}${region}`
			const country = main.country ? `, ${main.country.displayName}` : ''
			return isUSBased ? primaryLocation : `${primaryLocation}${country}`
		}

		return (
			<ListItem key={key} divider>
				<Link href={`/brewery/${brewery.id}`}>
					<a>
						<ListItemText primary={brewery.name} secondary={location()} />
					</a>
				</Link>
				<ListItemSecondaryAction onClick={() => handleOpenRemoveDialog(brewery)}>
					<IconButton edge="end" aria-label="delete">
						<DeleteIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		)
	}

	return (
		<>
			<Head>
				<title>BeerBuddy - User Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h4" component="h2" className={baseStyles.pageTitle}>
				List Details
			</Typography>

			<Typography variant="h2" component="h3" gutterBottom>
				{details.name}
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12} md={5}>
					<Paper className={baseStyles.cardBase}>
						<Typography variant="h6">Created On: {formatDate(details.dateCreated)}</Typography>
						<Typography variant="h6">Last Modified: {formatDate(details.lastModified)}</Typography>
					</Paper>
					<Button
						variant="outlined"
						color="secondary"
						onClick={() => console.log('sharing..', details._id)}
					>
						Share
					</Button>
				</Grid>
				<Grid item xs={12} md={7}>
					<Paper className={baseStyles.cardBase}>
						<Typography variant="h4" gutterBottom>
							Beer
						</Typography>
						<Divider />
						<List>
							{details.beerItems.length ? (
								details.beerItems.map((item, idx) => renderBeerItem(idx, item))
							) : (
								<ListItem className={styles.noItems}>
									<ListItemText primary="None added yet" />
								</ListItem>
							)}
						</List>
					</Paper>
					<Paper className={baseStyles.cardBase}>
						<Typography variant="h4" gutterBottom>
							Breweries
						</Typography>
						<Divider />
						<List>
							{details.breweryItems.length ? (
								details.breweryItems.map((item, idx) => renderBreweryItem(idx, item))
							) : (
								<ListItem className={styles.noItems}>
									<ListItemText primary="None added yet" />
								</ListItem>
							)}
						</List>
					</Paper>
				</Grid>
			</Grid>
			<Dialog
				open={removeDialogOpen}
				onClose={handleCloseRemoveDialog}
				aria-labelledby="remove-from-list"
			>
				<DialogTitle id="remove-from-list">Remove Item From List</DialogTitle>
				<DialogContent>
					{removeLoading ? (
						<LoadingState />
					) : (
						<>
							<DialogContentText>{`Are you sure you would like to remove ${itemToRemove?.name} from ${details.name}?`}</DialogContentText>
							{removeError && (
								<Typography color="error">
									There was an error remove the item from the list.
								</Typography>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseRemoveDialog} color="primary" disabled={removeLoading}>
						Cancel
					</Button>
					<Button onClick={handleRemoveFromList} color="primary" disabled={removeLoading}>
						Yes, Remove
					</Button>
				</DialogActions>
			</Dialog>
			<pre className={baseStyles.code}>
				<code>{JSON.stringify(details, null, 2)}</code>
			</pre>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const { id } = ctx.query

	return {
		props: { id },
	}
}

export default UserListDetailsPage
