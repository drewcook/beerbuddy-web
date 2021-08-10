import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '@bb/components/AuthenticationContext'
import ContentLayout from '@bb/components/ContentLayout'
import { initializeApollo } from '@bb/lib/apollo-client/apolloClient'
import useRemoveServerSideJss from '@bb/lib/useRemoveServerSideJss'
import useServiceWorkers from '@bb/lib/useServiceWorkers'
import '@bb/styles/globals.scss'
import theme from '@bb/styles/theme'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import withApollo from 'next-with-apollo'
import App from 'next/app'

const BeerBuddy = ({ Component, pageProps, router, apollo }) => {
	// Custom hooks
	useRemoveServerSideJss()
	useServiceWorkers()

	return (
		<ApolloProvider client={apollo}>
			<ThemeProvider theme={theme}>
				<AuthProvider apolloClient={apollo}>
					<CssBaseline />
					<ContentLayout content={<Component {...pageProps} />} router={router} />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}

BeerBuddy.getServerSideProps = async appContext => {
	const appProps = await App.getServerSideProps(appContext)

	return {
		props: {
			...appProps,
		},
	}
}

export default withApollo(initializeApollo)(BeerBuddy)
