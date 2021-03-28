import Head from 'next/head'

const DashboardPage = props => (
	<>
		<Head>
			<title>BeerBuddy - My Dashboard</title>
			<link rel="icon" href="/favicon.ico" />
		</Head>

		<h2>My Dashboard</h2>
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
