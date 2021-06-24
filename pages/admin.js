import { Box, Button, Paper } from '@material-ui/core'
import { get } from 'axios'
import qs from 'qs'
import requiresAuthentication from '@bb/components/requiresAuthentication'

const BASE_URL = 'https://api.brewerydb.com/v2'
const KEY_PARAM = '?key=69ee360e54918c2ed9d0e2d8568dafda'

const AdminPage = props => {
	// Search for breweries near a specified coordinate.
	const handleSearchGeoPoint = async () => {
		const params = qs.stringify({
			lat: '37.7077529', // req
			lng: '105.2593173', // req
			radius: '10',
			unit: 'mi',
			withSocialAccounts: 'y',
			withGuilds: 'y',
			withAlternateNames: 'y',
		})
		const url = `${BASE_URL}/search/geo/point${KEY_PARAM}&${params}`
		const resp = await get(url)
		console.log(resp)
	}

	return (
		<div>
			<Paper>
				<Box p={5}>
					<Button color="primary" variant="outlined" onClick={handleSearchGeoPoint}>
						Search Geo Point
					</Button>
				</Box>
			</Paper>
		</div>
	)
}

export default requiresAuthentication(AdminPage)
