import Head from 'next/head'
import { Typography } from '@material-ui/core'
import baseStyles from '../styles/base.module.scss'

const DashboardPage = props => (
	<>
		<Head>
			<title>BeerBuddy - My Dashboard</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<Typography variant="h3" className={baseStyles.pageTitle}>
			My Dashboard
		</Typography>
		<ul>
			<li>Display # of lists</li>
			<li>Display recent history events</li>
			<li>Display favorites</li>
			<li>
				Display statistics
				<ul>
					<li># beers logged</li>
					<li># breweries checked into</li>
				</ul>
			</li>
		</ul>
	</>
)

export default DashboardPage
