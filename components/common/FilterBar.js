import { Button, Grid, FormControl, InputLabel, Paper, Typography } from '@material-ui/core'
import { useState } from 'react'
import CountriesDropdown from '../CountriesDropdown'
import StatesDropdown from '../StatesDropdown'
import styles from '@bb/styles/filterBar.module.scss'

const FilterBar = props => {
	const { onFilter } = props
	const [country, setCountry] = useState('')
	const [state, setState] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onFilter({ country, state })
	}

	return (
		<Paper className={styles.filterBar}>
			<Typography variant="h4" gutterBottom>
				Filter
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={5}>
						<FormControl variant="outlined" className={styles.dropdown} fullWidth value={country}>
							<InputLabel id="countries-label">Filter By Country</InputLabel>
							<CountriesDropdown onChange={e => setCountry(e.target.value)} value={country} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={5}>
						<FormControl variant="outlined" className={styles.dropdown} fullWidth value={state}>
							<InputLabel id="states-label">Filter By State</InputLabel>
							<StatesDropdown onChange={e => setState(e.target.value)} value={state} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={2}>
						<Button
							variant="contained"
							color="secondary"
							disableElevation
							fullWidth
							size="large"
							type="submit"
						>
							Filter
						</Button>
					</Grid>
				</Grid>
			</form>
		</Paper>
	)
}

export default FilterBar
