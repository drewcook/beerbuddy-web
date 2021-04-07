import { Box, Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import * as breweryDbService from '@bb/api/breweryDb'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import PageTitle from '@bb/components/PageTitle'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BeerDetailsPage = ({ details }) => {
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
