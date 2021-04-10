import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core'
import Link from 'next/link'
import PropTypes from 'prop-types'
import AddItemToListDialog from './AddItemToListDialog'
import styles from '@bb/styles/list.module.scss'

const BeerCard = ({ beer }) => (
	<Card className={styles.card}>
		<CardContent>
			<CardMedia
				component="img"
				image={beer.labels?.medium ?? '/beer_mug.png'}
				title={beer.name}
				alt={beer.name}
			/>
			<Typography variant="h6">{beer.name}</Typography>
			{beer.breweries && (
				<Typography>
					<em>{beer.breweries[0].name}</em>
				</Typography>
			)}
			{beer.style?.shortName && <Typography variant="subtitle1">{beer.style.shortName}</Typography>}
			<Typography variant="body2">ABV: {beer.abv ? `${beer.abv}%` : 'n/a'}</Typography>
			<Typography variant="body2">IBU: {beer.ibu ? beer.ibu : 'n/a'}</Typography>
		</CardContent>
		<CardActions className={styles.btns}>
			<AddItemToListDialog
				beerId={beer.id}
				btnProps={{ fullWidth: true, size: 'small', color: 'secondary' }}
			/>
			<Link href={`/beer/${beer.id}`}>
				<a>
					<Button variant="outlined" color="primary" size="small" fullWidth>
						View Details
					</Button>
				</a>
			</Link>
		</CardActions>
	</Card>
)

BeerCard.propTypes = {
	beer: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
}

export default BeerCard
