import { Button, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { breweryDbService } from '@bb/api/'
import AddItemToListDialog from '@bb/components/AddItemToListDialog'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/details.module.scss'

const BreweryDetailsPage = props => {
	const { details } = props
	const { isAuthenticated } = useAuthentication()

	if (!isAuthenticated) console.log("uh oh, you shouldn'nt be here")

	return (
		<>
			<Head>
				<title>BeerBuddy - Brewery Details</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Link href="/brewery/list">
				<a>
					<Button variant="outlined" color="secondary">
						Back To List
					</Button>
				</a>
			</Link>

			<Typography variant="h3" className={baseStyles.pageTitle}>
				Brewery Details
			</Typography>

			<AddItemToListDialog beerId={details.id} />

			<pre className={baseStyles.code}>
				<code>{JSON.stringify(details, null, 2)}</code>
			</pre>
		</>
	)
}

export const getServerSideProps = async ctx => {
	const resp = await breweryDbService.getBreweryDetails(ctx.query.id)
	const { data } = resp

	return {
		props: {
			details: data,
		},
	}
}

export default BreweryDetailsPage
