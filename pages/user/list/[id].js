import Head from 'next/head'
import { Typography } from '@material-ui/core'
import { useAuthentication } from '~/components/AuthenticationContext'
import AddItemToListDialog from '~/components/AddItemToListDialog'
import styles from '~/styles/details.module.scss'
import baseStyles from '~/styles/base.module.scss'

const UserListDetailsPage = props => {
	const { details } = props
	const { isAuthenticated } = useAuthentication()

	if (!isAuthenticated) console.log("uh oh, you shouldn'nt be here")

	return (
		<>
			<Head>
				<title>BeerBuddy - User Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				User Details
			</Typography>

			<AddItemToListDialog beerId={details.id} />

			<pre className={styles.code}>
				<code>{JSON.stringify(details, null, 2)}</code>
			</pre>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const { id } = ctx.req.query
	// mock user details query
	const resp = await ctx.query.id
	const { data } = resp

	return {
		props: {
			details: data,
		},
	}
}

export default UserListDetailsPage
