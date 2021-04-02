import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core'
import { listService } from '~/api/'
import { useViewer } from './ViewerContext'

const AddItemToListDialog = ({ beerId, breweryId }) => {
	const { viewer } = useViewer()
	const [open, setOpen] = useState(false)
	const [currentUser, setCurrentUser] = useState(null)
	const [lists, setLists] = useState([])
	const [listId, setListId] = useState('new')
	const [listName, setListName] = useState('')

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
				// create the new list with the beerID in it
				await listService.createListForUser({
					userId: currentUser._id,
					name: listName,
					beerIds: beerId ? [beerId] : [],
					breweryIds: breweryId ? [brewerId] : [],
				})
				handleClose()
				// repopulate dropdown after add
				const resp = await listService.getUserLists(user._id)
				setLists(resp)
			} else {
				await listService.addBeerToList({ listId, beerId, name: listName })
				handleClose()
			}
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(async () => {
		const resp = await listService.getUserLists(viewer._id)
		setLists(resp)
	}, [])

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Add To List
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="add-to-list">
				<DialogTitle id="add-to-list">Add To List</DialogTitle>
				<DialogContent>
					<DialogContentText>What list would you like to add this item to?</DialogContentText>
					<FormControl fullWidth>
						<InputLabel id="lists-dropdown-label">My Lists</InputLabel>
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
							{lists.map(list => (
								<MenuItem value={list._id}>{list.name}</MenuItem>
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
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={handleAddToList} color="primary">
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

AddItemToListDialog.propTypes = {
	beerId: PropTypes.string,
	breweryId: PropTypes.string,
}

AddItemToListDialog.defaultProps = {
	beerId: null,
	breweryId: null,
}

export default AddItemToListDialog
