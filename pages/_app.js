import { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo-client/apolloClient'
import { AuthProvider } from '../components/AuthenticationContext'
import ContentLayout from '../components/ContentLayout'
import theme from '../styles/theme'
import '../styles/globals.scss'

const BeerBuddy = ({ Component, pageProps }) => {
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
					<CssBaseline />
					<ContentLayout content={<Component {...pageProps} />} />
				</AuthProvider>
			</ThemeProvider>
		</ApolloProvider>
	)
}

export default BeerBuddy
