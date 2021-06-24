import {
	Button,
	Grid,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Typography,
} from '@material-ui/core'
import { useState } from 'react'
import CountriesDropdown from '../CountriesDropdown'
import StatesDropdown from '../StatesDropdown'
import styles from '@bb/styles/filterBar.module.scss'

const FilterBar = props => {
	const { onFilter } = props
	const [type, setType] = useState('')
	const [country, setCountry] = useState('')
	const [state, setState] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		onFilter({ type, country, state })
	}

	return (
		<Paper className={styles.filterBar}>
			<Typography variant="h5" className={styles.filterTitle}>
				Filter by Location
			</Typography>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={3}>
						<FormControl variant="outlined" className={styles.dropdown} fullWidth value={type}>
							<InputLabel id="type-label">Location Type</InputLabel>
							<Select
								labelId="type-label"
								id="type-select"
								value={type}
								onChange={e => setType(e.target.value)}
								label="Brewery Type"
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								<MenuItem value="macro">Macro Brewery</MenuItem>
								<MenuItem value="micro">Micro Brewery</MenuItem>
								<MenuItem value="brewpub">Brewpub</MenuItem>
								<MenuItem value="tasting">Tasting Room</MenuItem>
								<MenuItem value="restaurant">Restaurant Location</MenuItem>
								<MenuItem value="production">Production Facility</MenuItem>
								<MenuItem value="office">Office Location</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={3}>
						<FormControl variant="outlined" className={styles.dropdown} fullWidth value={country}>
							<InputLabel id="countries-label">Country</InputLabel>
							<CountriesDropdown onChange={e => setCountry(e.target.value)} value={country} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={3}>
						<FormControl
							variant="outlined"
							className={styles.dropdown}
							fullWidth
							value={state}
							disabled={country !== '' && country !== 'US'}
						>
							<InputLabel id="states-label">State</InputLabel>
							<StatesDropdown onChange={e => setState(e.target.value)} value={state} />
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={3}>
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
