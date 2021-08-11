import { useMutation, useQuery } from '@apollo/client'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import requiresAuthentication from '@bb/components/requiresAuthentication'
import {
	ADD_USER_FAVORITE_MUTATION,
	BREWERY_DETAILS_QUERY,
	REMOVE_USER_FAVORITE_MUTATION,
	VIEWER_QUERY,
} from '@bb/lib/apollo-client/schemas'
import styles from '@bb/styles/details.module.scss'
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
import Image from 'next/image'
import Link from 'next/link'

const BreweryDetailsPage = ({ id, me }) => {
	const { data, loading, error } = useQuery(BREWERY_DETAILS_QUERY, { variables: { id } })
	const details = _get(data, 'brewery')

	const [addToFavorites, { loading: addLoading, error: addError }] = useMutation(
		ADD_USER_FAVORITE_MUTATION,
		{
			variables: {
				input: { userId: me._id, itemId: id, name: details?.name, type: 'brewery' },
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
				Sorry, an error occurred while getting the brewery details.
			</Typography>
		)

	return (
		<>
			<Head>
				<title>BeerBuddy - Brewery Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageTitle title="Beer Details" headline={details.name} />

			<Box mb={2}>
				<Link href="/brewery/list">
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
				<AddItemToListDialog beerId={details.id} userId={me._id} />
			</Box>

			<Divider />

			<Paper className={styles.paper}>
				<div className={styles.breweryImage}>
					<Image
						src={details.images?.squareMedium ?? '/brewery_vats2.png'}
						alt={details.name}
						width="200"
						height="200"
					/>
				</div>
				<Typography variant="h4" gutterBottom>
					About This Brewery
				</Typography>
				<Typography>
					<em>Established in {details.established}</em>
				</Typography>
				<Typography variant="subtitle1" gutterBottom>
					{details.description}
				</Typography>
				{details.website && (
					<Typography gutterBottom>
						<Link href={details.website}>
							<a>{details.website}</a>
						</Link>
					</Typography>
				)}
				<Typography variant="h5" gutterBottom>
					Locations
				</Typography>
				{details.locations?.length > 0 &&
					details.locations.map(location => (
						<Box key={location.id} my={3}>
							<Typography gutterBottom>
								<strong>{location.name}</strong>
							</Typography>
							<Typography variant="subtitle2" gutterBottom>
								<strong>{location.locationTypeDisplay}</strong>
							</Typography>
							<Typography gutterBottom>
								{location.streetAddress}
								<br />
								{location.locality}, {location.region}, {location.postalCode}{' '}
								{location.country?.displayName}
							</Typography>
							<Typography>
								Open To Public: {location.openToPublic === 'Y' ? 'Yes' : 'No'}
							</Typography>
							<Typography>Currently Closed: {location.isClosed === 'Y' ? 'Yes' : 'No'}</Typography>
						</Box>
					))}
				<List>
					<ListItem divider>
						<ListItemText>
							Currently Operating: {details.isInBusiness === 'Y' ? 'Yes' : 'No'}
						</ListItemText>
					</ListItem>
					<ListItem divider>
						<ListItemText>Organic: {details.isOrganic === 'Y' ? 'Yes' : 'No'}</ListItemText>
					</ListItem>
					<ListItem divider>
						<ListItemText>Mass Owned: {details.isMassOwned === 'Y' ? 'Yes' : 'No'}</ListItemText>
					</ListItem>
				</List>
				{details.socialAccounts?.length > 0 && (
					<Box mt={5}>
						<Typography variant="h4">Social Accounts</Typography>
						{details.socialAccounts.map(acct => (
							<Box my={2} key={acct.id}>
								{acct.link ? (
									<Link href={acct.link}>
										<a>
											<Typography>{acct.socialMedia.name}</Typography>
										</a>
									</Link>
								) : (
									<Typography>{acct.socialMedia.name}</Typography>
								)}
							</Box>
						))}
					</Box>
				)}
			</Paper>
		</>
	)
}

export default requiresAuthentication(BreweryDetailsPage)
