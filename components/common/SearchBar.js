import { Button, Grid, TextField } from '@material-ui/core'
import { useState } from 'react'
import styles from '@bb/styles/searchBar.module.scss'

const SearchBar = props => {
	const { type, onSearch } = props
	const [searchTerm, setSearchTerm] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onSearch(searchTerm)
	}

	return (
		<div className={styles.searchBar}>
			<h3>Search {type}</h3>
			<form onSubmit={handleSubmit}>
				<Grid container>
					<Grid item xs={10}>
						<TextField
							variant="filled"
							label="Search for a brewski..."
							fullWidth
							className={styles.input}
							value={searchTerm}
							onChange={e => setSearchTerm(e.target.value)}
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							variant="contained"
							color="secondary"
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
