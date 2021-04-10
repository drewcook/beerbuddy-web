import { useQuery } from '@apollo/client'
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
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import { BREWERY_DETAILS_QUERY } from '@bb/lib/apollo-client/schemas'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BreweryDetailsPage = ({ id }) => {
	const { data, loading, error } = useQuery(BREWERY_DETAILS_QUERY, { variables: { id } })
	const details = _get(data, 'brewery')

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

			<AddItemToListDialog beerId={details.id} />

			<Divider />

			<Paper className={styles.paper}>
				{details.images && <img src={details.images.large} alt={details.name} />}
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
				{details.locations.length > 0 &&
					details.locations.map(location => (
						<Box my={3}>
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
				{details.socialAccounts.length > 0 && (
					<Box mt={5}>
						<Typography variant="h4">Social Accounts</Typography>
						{details.socialAccounts.map(acct => (
							<Box my={2}>
								<Link href={acct.link}>
									<a>
										<Typography>{acct.socialMedia.name}</Typography>
									</a>
								</Link>
							</Box>
						))}
					</Box>
				)}
			</Paper>
		</>
	)
}

export const getServerSideProps = async ctx => ({
	props: {
		id: ctx.query.id,
	},
})

export default BreweryDetailsPage
