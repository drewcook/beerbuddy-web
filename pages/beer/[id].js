import { Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { breweryDbService } from '@bb/api/'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BeerDetailsPage = ({ details }) => {
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

			<pre className={baseStyles.code}>
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
