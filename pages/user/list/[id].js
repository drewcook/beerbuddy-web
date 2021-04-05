import { useQuery, gql } from '@apollo/client'
import { Button, Card, CardActions, CardContent, Paper, Typography } from '@material-ui/core'
import _get from 'lodash/get'
import Head from 'next/head'
import Link from 'next/link'
import { formatDate } from '@bb/lib/dateUtils'
import getErrors from '@bb/lib/getGraphQLErrors'
import LoadingState from '@bb/components/LoadingState'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/listDetails.module.scss'

const LIST_DETAILS_QUERY = gql`
	query GetListDetails($listId: ID!) {
		listDetails(listId: $listId) {
			name
			dateCreated
			dateLastModified
			beerItems {
				id
				name
			}
			breweryItems {
				id
				name
			}
		}
	}
`

const UserListDetailsPage = ({ id }) => {
	const { data, loading, error } = useQuery(LIST_DETAILS_QUERY, {
		variables: { listId: id },
		fetchPolicy: 'no-cache',
	})
	console.log({ data })
	const details = _get(data, 'listDetails')

	if (loading) return <LoadingState />
	if (error) return <Typography color="error">{getErrors(error)}</Typography>

	return (
		<>
			<Head>
				<title>BeerBuddy - User Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				List Details
			</Typography>

			<Paper className={baseStyles.cardBase}>
				<Typography variant="h4">{details.name}</Typography>
				<Typography variant="h6">Created On: {formatDate(details.dateCreated)}</Typography>
				<Typography variant="h6">Last Modified: {formatDate(details.lastModified)}</Typography>
			</Paper>

			{details.beerItems.concat(details.breweryItems).map(item => (
				<Card key={item._id} className={baseStyles.cardBase}>
					<CardContent>
						<Typography>ID: {item.id}</Typography>
						<Typography>Name: {item.name}</Typography>
					</CardContent>
					<CardActions>
						<Link href={`/${item.__typename.toLowerCase()}/${item.id}`}>
							<a>
								<Button variant="outlined" color="secondary">
									View Details
								</Button>
							</a>
						</Link>
					</CardActions>
				</Card>
			))}
			<pre className={baseStyles.code}>
				<code>{JSON.stringify(details, null, 2)}</code>
			</pre>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const { id } = ctx.query

	return {
		props: { id },
	}
}

export default UserListDetailsPage
