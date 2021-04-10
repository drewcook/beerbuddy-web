import { Box, Button } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import PageTitle from '@bb/components/PageTitle'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BeerDetailsPage = ({ id }) => {
	return null
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

export const getServerSideProps = async ctx => ({
	props: {
		id: ctx.query.id,
	},
})

export default BeerDetailsPage
