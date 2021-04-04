import { ApolloProvider } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { useEffect } from 'react'
import { useApollo } from '@bb/lib/apollo-client/apolloClient'
import { AuthProvider } from '@bb/components/AuthenticationContext'
import ContentLayout from '@bb/components/ContentLayout'
import { ViewerProvider } from '@bb/components/ViewerContext'
import '@bb/styles/globals.scss'
import theme from '@bb/styles/theme'

const BeerBuddy = ({ Component, pageProps, router }) => {
	const apolloClient = useApollo(pageProps)

	useEffect(() => {
		// Remove the server-side injected CSS to fix MUI className mismatch errors
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<ApolloProvider client={apolloClient}>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<ViewerProvider router={router}>
						<CssBaseline />
						<ContentLayout content={<Component {...pageProps} />} />
					</ViewerProvider>
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default BeerBuddy
