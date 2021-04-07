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
import { USER_LISTS_QUERY, ADD_ITEM_MUTATION } from '@bb/lib/apollo-client/shemas'
import LoadingState from './LoadingState'
import { useViewer } from './ViewerContext'

const AddItemToListDialog = ({ beerId, breweryId, btnProps }) => {
	const { viewer } = useViewer()
	const [open, setOpen] = useState(false)
	const [listId, setListId] = useState('new')
	const [listName, setListName] = useState('')
	const { data: getData, loading: getLoading, error: getError } = useQuery(USER_LISTS_QUERY, {
		variables: { userId: viewer._id },
	})
	const [addItem, { loading: addLoading, error: addError }] = useMutation(ADD_ITEM_MUTATION, {
		refetchQueries: [{ query: USER_LISTS_QUERY, variables: { userId: viewer._id } }],
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
				// TODO: wire this up
				// // create the new list with the beerID in it
				// await listService.createListForUser({
				// 	userId: currentUser._id,
				// 	name: listName,
				// 	beerIds: beerId ? [beerId] : [],
				// 	breweryIds: breweryId ? [brewerId] : [],
				// })
				// handleClose()
				// // repopulate dropdown after add
				// const resp = await listService.getUserLists(user._id)
				// setLists(resp)
			} else {
				const list = await addItem({ variables: { input: { listId, beerId, breweryId } } })
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
					{getLoading || addLoading ? (
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
							{addError && (
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
}

AddItemToListDialog.defaultProps = {
	beerId: undefined,
	breweryId: undefined,
	btnProps: undefined,
}

export default AddItemToListDialog
