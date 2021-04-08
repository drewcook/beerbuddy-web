import { useQuery, useMutation } from '@apollo/client'
import {
	Box,
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
import ShareIcon from '@material-ui/icons/Share'
import StarIcon from '@material-ui/icons/Star'
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	USER_LISTS_QUERY,
	USER_DASHBOARD_QUERY,
	DELETE_LIST_MUTATION,
	LIST_DETAILS_QUERY,
	REMOVE_ITEM_MUTATION,
} from '@bb/lib/apollo-client/shemas'
import { formatDate } from '@bb/lib/dateUtils'
import getErrors from '@bb/lib/getGraphQLErrors'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import { useViewer } from '@bb/components/ViewerContext'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/listDetails.module.scss'

const UserListDetailsPage = ({ id }) => {
	const router = useRouter()
	const { viewer } = useViewer()
	const [itemToRemove, setItemToRemove] = useState(null)
	const [removeDialogOpen, setRemoveDialogOpen] = useState(false)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const { data, loading, error } = useQuery(LIST_DETAILS_QUERY, {
		variables: { listId: id },
	})
	const details = _get(data, 'listDetails')

	const [removeItemFromList, { loading: removeLoading, error: removeError }] = useMutation(
		REMOVE_ITEM_MUTATION,
		{
			refetchQueries: [
				{
					query: LIST_DETAILS_QUERY,
					variables: { listId: details?._id },
				},
			],
			awaitRefetchQueries: true,
		},
	)
	const [deleteUserList, { loading: deleteLoading, error: deleteError }] = useMutation(
		DELETE_LIST_MUTATION,
		{
			update: (store, { data }) => {
				// Update User Dashboard cache
				const dashboardData = store.readQuery({
					query: USER_DASHBOARD_QUERY,
					variables: { userId: viewer._id },
				})
				if (dashboardData) {
					store.writeQuery({
						query: USER_DASHBOARD_QUERY,
						variables: { userId: viewer._id },
						data: {
							userDashboard: {
								...dashboardData.userDashboard,
								lists: dashboardData.userDashboard.lists.filter(
									list => list._id !== data?.deleteUserList._id,
								),
							},
						},
					})
				}
				// Update User Lists cache
				const listsData = store.readQuery({
					query: USER_LISTS_QUERY,
					variables: { userId: viewer._id },
				})
				if (listsData) {
					store.writeQuery({
						query: USER_LISTS_QUERY,
						variables: { userId: viewer._id },
						data: {
							userLists: listsData.userLists.filter(list => list._id !== data?.deleteUserList._id),
						},
					})
				}
			},
		},
	)

	const handleOpenRemoveDialog = item => {
		setItemToRemove(item)
		setRemoveDialogOpen(true)
	}

	const handleCloseRemoveDialog = () => {
		setItemToRemove(null)
		setRemoveDialogOpen(false)
	}

	const handleCloseDeleteDialog = () => {
		setDeleteDialogOpen(false)
	}

	const handleRemoveFromList = async () => {
		const type = itemToRemove.__typename.toLowerCase()
		// construct input
		let input = { listId: id }
		if (type === 'beer') input = { ...input, beerId: itemToRemove.id }
		if (type === 'brewery') input = { ...input, breweryId: itemToRemove.id }

		try {
			await removeItemFromList({
				variables: { input },
			})
			handleCloseRemoveDialog()
		} catch (ex) {
			console.error(ex)
		}
	}

	const handleDeleteUserList = async () => {
		try {
			await deleteUserList({ variables: { id } })
			handleCloseDeleteDialog()
			router.push('/user/lists')
		} catch (ex) {
			console.error(ex)
		}
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
			<ListItem key={key} divider className={styles.listItem}>
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
			<ListItem key={key} divider className={styles.listItem}>
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

			<PageTitle title="List Details" headline={details.name} />

			<Grid container spacing={3}>
				<Grid item xs={12} md={5}>
					<Paper className={baseStyles.cardBase}>
						<Typography variant="h4" gutterBottom>
							Details
						</Typography>
						<Divider />
						<Box my={2}>
							<Typography gutterBottom color="textSecondary">
								<em>Created {formatDate(details.dateCreated)}</em>
							</Typography>
						</Box>
						<Box my={2}>
							<Typography>
								Beer Count: <strong>{details.beerItems.length}</strong>
							</Typography>
							<Typography>
								Brewery Count: <strong>{details.breweryItems.length}</strong>
							</Typography>
						</Box>
						<Box my={2}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => console.log('favoriting..', id)}
								endIcon={<StarIcon />}
							>
								Add To Favorites
							</Button>
						</Box>
						<Box my={2}>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => console.log('sharing..', id)}
								endIcon={<ShareIcon />}
							>
								Share
							</Button>
						</Box>
						<Box my={2}>
							<IconButton edge="end" aria-label="delete" onClick={() => setDeleteDialogOpen(true)}>
								<DeleteIcon />
							</IconButton>
						</Box>
					</Paper>
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
					{removeLoading || loading ? (
						<LoadingState />
					) : (
						<>
							<DialogContentText>{`Are you sure you would like to remove ${itemToRemove?.name} from ${details.name}?`}</DialogContentText>
							{removeError && (
								<Typography color="error">
									An error occurred while removing the item from the list.
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

			<Dialog
				open={deleteDialogOpen}
				onClose={() => setDeleteDialogOpen(false)}
				aria-labelledby="delete-user-list"
			>
				<DialogTitle id="delete-user-list">Delete User List</DialogTitle>
				<DialogContent>
					{deleteLoading ? (
						<LoadingState />
					) : (
						<>
							<DialogContentText>{`Are you sure you would like to delete ${details.name} from your lists? This cannot be undone.`}</DialogContentText>
							{deleteError && (
								<Typography color="error">
									An error occurred while deleting the user list.
								</Typography>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setDeleteDialogOpen(false)}
						color="primary"
						disabled={deleteLoading}
					>
						Cancel
					</Button>
					<Button onClick={handleDeleteUserList} color="primary" disabled={deleteLoading}>
						Yes, Delete
					</Button>
				</DialogActions>
			</Dialog>
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
