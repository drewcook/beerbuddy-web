import { useEffect } from 'react'
import { Container, CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider } from '../components/AuthenticationContext'
import theme from '../styles/theme'
import '../styles/globals.scss'
import NavigationBar from '../components/NavigationBar'

const BeerBuddy = props => {
	const { Component, pageProps } = props

	useEffect(() => {
		// Remove the server-side injected CSS to fix MUI className mismatch errors
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<ThemeProvider theme={theme}>
			<AuthProvider>
				<CssBaseline />
				<NavigationBar />
				<Container>
					<Component {...pageProps} />
				</Container>
			</AuthProvider>
		</ThemeProvider>
	)
}

export default BeerBuddy
