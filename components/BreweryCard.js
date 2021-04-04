import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import LanguageIcon from '@material-ui/icons/Language'
import Link from 'next/link'
import PropTypes from 'prop-types'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import styles from '@bb/styles/list.module.scss'

const BreweryCard = ({ brewery }) => {
	const renderLocation = () => {
		return (
			brewery.locations && (
				<Typography variant="overline">
					<em>
						{brewery.locations[0].locality}
						{brewery.locations[0].region && ', ' + brewery.locations[0].region}
						{brewery.locations[0].country.displayName !== 'United States' &&
							', ' + brewery.locations[0].country.displayName}
					</em>
				</Typography>
			)
		)
	}

	return (
		<Card className={styles.card}>
			{brewery.images && (
				<CardMedia
					component="img"
					image={brewery.images.squareMedium}
					title={brewery.name}
					alt={brewery.name}
				/>
			)}
			<CardContent>
				<Typography variant="h6">{brewery.name}</Typography>
				{renderLocation()}
				{brewery.website && (
					<Typography variant="body2">
						<a href={brewery.website} target="_blank" className={styles.website}>
							<LanguageIcon /> Website
						</a>
					</Typography>
				)}
			</CardContent>
			<CardActions className={styles.btns}>
				<AddItemToListDialog
					breweryId={brewery.id}
					btnProps={{ fullWidth: true, size: 'small', color: 'secondary' }}
				/>
				<Link href={`/brewery/${brewery.id}`}>
					<a>
						<Button variant="outlined" color="primary" size="small" fullWidth>
							View Details
						</Button>
					</a>
				</Link>
			</CardActions>
		</Card>
	)
}

BreweryCard.propTypes = {
	brewery: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
}

export default BreweryCard
