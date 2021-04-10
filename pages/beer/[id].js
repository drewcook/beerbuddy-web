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
import { BEER_DETAILS_QUERY } from '@bb/lib/apollo-client/schemas'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import LoadingState from '@bb/components/LoadingState'
import PageTitle from '@bb/components/PageTitle'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BeerDetailsPage = ({ id }) => {
	const { data, loading, error } = useQuery(BEER_DETAILS_QUERY, { variables: { id } })
	const details = _get(data, 'beer')

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

			<AddItemToListDialog beerId={details?.id} />

			<Divider />

			<Paper className={styles.paper}>
				{details.labels && <img src={details.labels.large} alt={details.name} />}
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
				{details.style.id && (
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
					<ListItem>
						<ListItemText>ABV: {details.abv ?? 'N/A'}</ListItemText>
						<ListItemText>IBU: {details.ibu ?? 'N/A'}</ListItemText>
						<ListItemText>Organic: {details.isOrganic === 'Y' ? 'Yes' : 'No'}</ListItemText>
						<ListItemText>Retired: {details.isRetired === 'Y' ? 'Yes' : 'No'}</ListItemText>
					</ListItem>
				</List>
			</Paper>
		</>
	)
}

export const getServerSideProps = async ctx => ({
	props: {
		id: ctx.query.id,
	},
})

export default BeerDetailsPage
