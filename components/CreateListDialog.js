import { useState } from 'react'
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
import { useViewer } from './ViewerContext'
import LoadingState from './LoadingState'
import { useMutation, gql } from '@apollo/client'

const CREATE_NEW_LIST = gql`
	mutation CreatNewList($input: CreateListInput!) {
		createNewList(input: $input) {
			_id
			name
			dateCreated
		}
	}
`

const CreateListDialog = () => {
	const { viewer } = useViewer()
	const [open, setOpen] = useState(false)
	const [name, setName] = useState('')

	const [addUserList, { data, loading, error }] = useMutation(CREATE_NEW_LIST)

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
			// TODO: implement refetchQueries: GET_USER_LISTS
			const resp = await addUserList({ variables: { input } })
			console.log({ resp, data })
			handleClose()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div>
			<Button variant="outlined" color="primary" onClick={toggleOpen}>
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
