import { Button, Grid, TextField } from '@material-ui/core'
import { useState } from 'react'
import styles from '@bb/styles/searchBar.module.scss'

const SearchBar = props => {
	const { onSearch } = props
	const [searchTerm, setSearchTerm] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onSearch(searchTerm)
	}

	return (
		<div className={styles.searchBar}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={10}>
						<TextField
							variant="filled"
							label="Search for a brewski..."
							fullWidth
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Button
							variant="contained"
							color="primary"
							disableElevation
							fullWidth
							size="large"
							type="submit"
						>
							Search
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	)
}

export default SearchBar
