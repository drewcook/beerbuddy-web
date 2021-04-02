import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from '~/styles/list.module.scss'

const BeerCard = ({ beer }) => {
	const handleAddToList = () => {
		console.log('adding to list', beer.name)
	}

	return (
		<Card className={styles.card}>
			<CardContent>
				<Typography variant="h6">{beer.name}</Typography>
				{beer.breweries && (
					<Typography>
						<em>{beer.breweries[0].name}</em>
					</Typography>
				)}
				{beer.style?.shortName && (
					<Typography variant="subtitle1">{beer.style.shortName}</Typography>
				)}
				<Typography variant="body2">
					<i className="fas fa-beer" data-fa-transform="flip-h"></i> ABV:{' '}
					{beer.abv ? `${beer.abv}%` : 'n/a'}
				</Typography>
				<Typography variant="body2">
					<i className="fas fa-beer" data-fa-transform="flip-h"></i> IBU:{' '}
					{beer.ibu ? beer.ibu : 'n/a'}
				</Typography>
			</CardContent>
			<CardActions className={styles.btns}>
				<Button
					variant="outlined"
					color="secondary"
					size="small"
					onClick={handleAddToList}
					fullWidth
				>
					Add To List
				</Button>
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
}

BeerCard.propTypes = {
	beer: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
}

export default BeerCard
