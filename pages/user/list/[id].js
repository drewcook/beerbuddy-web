import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import _get from 'lodash/get'
import LoadingState from '~/components/LoadingState'
import styles from '~/styles/details.module.scss'
import baseStyles from '~/styles/base.module.scss'

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
	const { data, loading, error } = useQuery(LIST_DETAILS_QUERY, { variables: { listId: id } })
	const details = _get(data, 'listDetails')
	console.log({ details })

	if (loading) return <LoadingState />
	if (error) return <Typography color="error">Error occurred</Typography>

	return (
		<>
			<Head>
				<title>BeerBuddy - User Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				List Details
			</Typography>

			<pre className={styles.code}>
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
