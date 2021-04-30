import { useQuery, useMutation } from '@apollo/client'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {
	ADD_ITEM_NEW_LIST_MUTATION,
	USER_DASHBOARD_QUERY,
	USER_LISTS_QUERY,
	ADD_ITEM_MUTATION,
	LIST_DETAILS_QUERY,
} from '@bb/lib/apollo-client/schemas'
import LoadingState from './LoadingState'

const AddItemToListDialog = ({ beerId, breweryId, btnProps, userId }) => {
	const [open, setOpen] = useState(false)
	const [listId, setListId] = useState('new')
	const [listName, setListName] = useState('')
	const { data: getData, loading: getLoading, error: getError } = useQuery(USER_LISTS_QUERY, {
		variables: { userId },
	})
	const [addItemToNewList, { loading: addNewLoading, error: addNewError }] = useMutation(
		ADD_ITEM_NEW_LIST_MUTATION,
		{
			update: (store, { data }) => {
				// Update User Dashboard cache
				const dashboardData = store.readQuery({
					query: USER_DASHBOARD_QUERY,
					variables: { userId },
				})
				if (dashboardData) {
					store.writeQuery({
						query: USER_DASHBOARD_QUERY,
						variables: { userId },
						data: {
							userDashboard: {
								...dashboardData.userDashboard,
								lists: [...dashboardData.userDashboard.lists, data?.addItemToNewList],
							},
						},
					})
				}

				// Update User Lists cache
				const listsData = store.readQuery({
					query: USER_LISTS_QUERY,
					variables: { userId },
				})
				if (listsData) {
					store.writeQuery({
						query: USER_LISTS_QUERY,
						variables: { userId },
						data: {
							userLists: [...listsData.userLists, data?.addItemToNewList],
						},
					})
				}
			},
		},
	)

	const [addItem, { loading: addLoading, error: addError }] = useMutation(ADD_ITEM_MUTATION, {
		update: (store, { data }) => {
			// User lists cache
			const listsData = store.readQuery({
				query: USER_LISTS_QUERY,
				variables: { userId },
			})
			if (listsData) {
				const userLists = listsData.userLists.map(list =>
					list._id === data?.addItemToList._id ? data?.addItemToList : list,
				)
				store.writeQuery({
					query: USER_LISTS_QUERY,
					variables: { userId },
					data: { userLists },
				})
			}
		},
		refetchQueries: [{ query: LIST_DETAILS_QUERY, variables: { listId } }],
	})

	const handleClickOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
		setListName('')
		setListId('new')
	}
	const handleChange = e => setListId(e.target.value)

	const handleAddToList = async () => {
		try {
			if (listId === 'new') {
				await addItemToNewList({
					variables: { input: { userId, listName, beerId, breweryId } },
				})

				handleClose()
			} else {
				await addItem({ variables: { input: { listId, beerId, breweryId } } })
				handleClose()
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<Button variant="outlined" color="primary" onClick={handleClickOpen} {...btnProps}>
				Add To List
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="add-to-list">
				<DialogTitle id="add-to-list">Add To List</DialogTitle>
				<DialogContent>
					{getLoading || addLoading || addNewLoading ? (
						<LoadingState />
					) : (
						<>
							<DialogContentText>What list would you like to add this item to?</DialogContentText>
							<FormControl fullWidth>
								<Select
									variant="outlined"
									labelId="list-dropdown-label"
									id="list-dropdown"
									value={listId}
									onChange={handleChange}
								>
									<MenuItem value="new">
										<em>Create New List</em>
									</MenuItem>
									{getData.userLists.map(list => (
										<MenuItem key={list._id} value={list._id}>
											{list.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{listId === 'new' && (
								<TextField
									margin="normal"
									variant="outlined"
									name="listName"
									onChange={e => setListName(e.target.value)}
									value={listName}
									fullWidth
								/>
							)}
							{getError && (
								<Typography color="error">There was an error getting the user lists.</Typography>
							)}
							{(addError || addNewError) && (
								<Typography color="error">
									There was an error adding the item to the list.
								</Typography>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="primary"
						disabled={getLoading || addLoading ? true : false}
					>
						Cancel
					</Button>
					<Button
						onClick={handleAddToList}
						color="primary"
						disabled={getLoading || addLoading ? true : false}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

AddItemToListDialog.propTypes = {
	beerId: PropTypes.string,
	breweryId: PropTypes.string,
	btnProps: PropTypes.shape({
		fullWidth: PropTypes.bool,
	}),
	userId: PropTypes.number.isRequired,
}

AddItemToListDialog.defaultProps = {
	beerId: undefined,
	breweryId: undefined,
	btnProps: undefined,
}

export default AddItemToListDialog
