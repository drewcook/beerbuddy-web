import { useQuery, useMutation } from '@apollo/client'
import {
	Box,
	Button,
	Divider,
	List,
	ListItem,
	ListItemText,
	Paper,
	Typography,
} from '@material-ui/core'
import StarIcon from '@material-ui/icons/Star'
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import {
	BEER_DETAILS_QUERY,
	ADD_USER_FAVORITE_MUTATION,
	REMOVE_USER_FAVORITE_MUTATION,
	VIEWER_QUERY,
} from '@bb/lib/apollo-client/schemas'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'
import styles from '@bb/styles/details.module.scss'

const BeerDetailsPage = ({ id, me }) => {
	const { data, loading, error } = useQuery(BEER_DETAILS_QUERY, { variables: { id } })
	const details = _get(data, 'beer')

	const [addToFavorites, { loading: addLoading, error: addError }] = useMutation(
		ADD_USER_FAVORITE_MUTATION,
		{
			variables: {
				input: { userId: me._id, itemId: id, name: details?.name, type: 'beer' },
			},
			update: (store, { data }) => {
				// Update Viewer cache
				const viewerData = store.readQuery({
					query: VIEWER_QUERY,
				})
				if (viewerData) {
					store.writeQuery({
						query: VIEWER_QUERY,
						data: {
							viewer: {
								...viewerData.viewer,
								favorites: [...viewerData.viewer.favorites, data?.addUserFavorite],
							},
						},
					})
				}
			},
		},
	)

	const [removeFromFavorites, { loading: removeLoading, error: removeError }] = useMutation(
		REMOVE_USER_FAVORITE_MUTATION,
		{
			variables: {
				input: {
					userId: me._id,
					favoriteId: me.favorites.filter(fav => fav.itemId === id)[0]?._id,
				},
			},
			update: (store, { data }) => {
				// Update Viewer cache
				const viewerData = store.readQuery({
					query: VIEWER_QUERY,
				})
				if (viewerData) {
					store.writeQuery({
						query: VIEWER_QUERY,
						data: {
							viewer: {
								...viewerData.viewer,
								favorites: viewerData.viewer.favorites.filter(
									fav => fav.itemId !== data?.removeUserFavorite.itemId,
								),
							},
						},
					})
				}
			},
		},
	)

	if (loading) return <LoadingState />

	if (error)
		return (
			<Typography color="error">
				Sorry, an error occurred while getting the beer details.
			</Typography>
		)

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Beer Details" headline={details.name} />

			<Box mb={2}>
				<Link href="/beer/list">
					<a>
						<Button variant="outlined" color="secondary">
							Back To List
						</Button>
					</a>
				</Link>
			</Box>

			{me.favorites.some(f => f.itemId === id) ? (
				<Box my={2}>
					<Button
						variant="contained"
						color="primary"
						onClick={removeFromFavorites}
						endIcon={<StarIcon />}
						disabled={removeLoading}
					>
						Remove From Favorites
					</Button>
					{removeError && (
						<Typography color="error">An error occrred while unfavoriting this item.</Typography>
					)}
				</Box>
			) : (
				<Box my={2}>
					<Button
						variant="contained"
						color="primary"
						onClick={addToFavorites}
						endIcon={<StarIcon />}
						disabled={addLoading}
					>
						Add To Favorites
					</Button>
					{addError && (
						<Typography color="error">An error occrred while favoriting this item.</Typography>
					)}
				</Box>
			)}

			<Box my={2}>
				<AddItemToListDialog beerId={details?.id} userId={me._id} />
			</Box>

			<Divider />

			<Paper className={styles.paper}>
				{details.labels && (
					<img src={details.labels.large} alt={details.name} className={styles.beerImage} />
				)}
				<Typography variant="h4" gutterBottom>
					About This Beer
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					{details.description}
				</Typography>
				<Typography variant="h6" component="p" gutterBottom>
					This is a beer from{' '}
					<Link href={`/brewery/${details.breweries[0].id}`}>
						<a>{details.breweries[0].name}.</a>
					</Link>
				</Typography>
				{details.glasswareId && (
					<Typography variant="h6" component="p" gutterBottom>
						This beer is best enjoyed in a {details.glass.name.toLowerCase()} glass.
					</Typography>
				)}
				<Typography variant="h5" gutterBottom>
					Beer Style
				</Typography>
				{details.style?.id && (
					<>
						<Typography gutterBottom>{details.style.description}</Typography>
						<Typography gutterBottom>
							{details.style.name}
							<small>{details.style.category.shortName}</small>
							<small>{details.style.category.name}</small>
						</Typography>
					</>
				)}
				<List>
					<ListItem divider>
						<ListItemText>ABV: {details.abv ?? 'N/A'}</ListItemText>
					</ListItem>
					<ListItem divider>
						<ListItemText>IBU: {details.ibu ?? 'N/A'}</ListItemText>
					</ListItem>
					<ListItem divider>
						<ListItemText>Organic: {details.isOrganic === 'Y' ? 'Yes' : 'No'}</ListItemText>
					</ListItem>
					<ListItem divider>
						<ListItemText>Retired: {details.isRetired === 'Y' ? 'Yes' : 'No'}</ListItemText>
					</ListItem>
				</List>
			</Paper>
		</>
	)
}

export default requiresAuthentication(BeerDetailsPage)
