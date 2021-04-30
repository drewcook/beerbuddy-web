import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import withApollo from 'next-with-apollo'
import App from 'next/app'
import { useEffect } from 'react'
import { initializeApollo } from '@bb/lib/apollo-client/apolloClient'
import { AuthProvider } from '@bb/components/AuthenticationContext'
import ContentLayout from '@bb/components/ContentLayout'
import '@bb/styles/globals.scss'
import theme from '@bb/styles/theme'

const BeerBuddy = ({ Component, pageProps, router, apollo }) => {
	useEffect(() => {
		// Remove the server-side injected CSS to fix MUI className mismatch errors
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

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
