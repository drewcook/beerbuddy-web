import { useMutation } from '@apollo/client'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Typography,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useState } from 'react'
import {
	CREATE_NEW_LIST,
	USER_DASHBOARD_QUERY,
	USER_LISTS_QUERY,
} from '@bb/lib/apollo-client/shemas'
import LoadingState from './LoadingState'
import { useViewer } from './ViewerContext'

const CreateListDialog = () => {
	const { viewer } = useViewer()
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')

	const [addUserList, { loading, error }] = useMutation(CREATE_NEW_LIST, {
		update: (store, { data }) => {
			// Update User Dashboard cache
			const dashboardData = store.readQuery({
				query: USER_DASHBOARD_QUERY,
				variables: { userId: viewer._id },
			})

			store.writeQuery({
				query: USER_DASHBOARD_QUERY,
				variables: { userId: viewer._id },
				data: {
					userDashboard: {
						...dashboardData.userDashboard,
						lists: [...dashboardData.userDashboard.lists, data?.createNewList],
					},
				},
			})

			// Update User Lists cache
			const listsData = store.readQuery({
				query: USER_LISTS_QUERY,
				variables: { userId: viewer._id },
			})

			store.writeQuery({
				query: USER_LISTS_QUERY,
				variables: { userId: viewer._id },
				data: {
					userLists: [...listsData.userLists, data?.createNewList],
				},
			})
		},
	})

	const toggleOpen = () => setOpen(!open)

	const handleClose = () => {
		toggleOpen()
		setName('')
	}

	const handleSubmit = async () => {
		const input = {
			userId: viewer._id,
			name,
		}
		try {
			await addUserList({ variables: { input } })
			handleClose()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={toggleOpen} endIcon={<AddIcon />}>
				Create New List
			</Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="create-list">
				<DialogTitle id="create-list">Create A New List</DialogTitle>
				{loading ? (
					<DialogContent>
						<LoadingState />
					</DialogContent>
				) : (
					<>
						<DialogContent>
							<DialogContentText>What would you like this list to be called?</DialogContentText>
							<TextField
								placeholder="Super Sours"
								margin="normal"
								variant="outlined"
								name="listName"
								onChange={e => setName(e.target.value)}
								value={name}
								fullWidth
							/>
						</DialogContent>
					</>
				)}
				{error && <Typography color="error">Error occurred</Typography>}
				<DialogActions>
					<Button onClick={handleClose} color="primary" disabled={loading}>
						Cancel
					</Button>
					<Button onClick={handleSubmit} color="primary" disabled={loading}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default CreateListDialog
