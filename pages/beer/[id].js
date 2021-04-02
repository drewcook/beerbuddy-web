import Link from 'next/link'
import Head from 'next/head'
import { Button, Typography } from '@material-ui/core'
import { useAuthentication } from '~/components/AuthenticationContext'
import { breweryDbService } from '~/api/'
import styles from '~/styles/details.module.scss'
import baseStyles from '~/styles/base.module.scss'
import AddItemToListDialog from '~/components/AddItemToListDialog'

const BeerDetailsPage = props => {
	const { details } = props
	const { isAuthenticated } = useAuthentication()

	if (!isAuthenticated) console.log("uh oh, you shouldn'nt be here")

	return (
		<>
			<Head>
				<title>BeerBuddy - Beer Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Link href="/beer/list">
				<a>
					<Button variant="outlined" color="secondary">
						Back To List
					</Button>
				</a>
			</Link>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				Beer Details
			</Typography>

			<AddItemToListDialog beerId={details.id} />

			<pre className={styles.code}>
				<code>{JSON.stringify(details, null, 2)}</code>
			</pre>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const resp = await breweryDbService.getBeerDetails(ctx.query.id)
	const { data } = resp

	return {
		props: {
			details: data,
		},
	}
}

export default BeerDetailsPage
