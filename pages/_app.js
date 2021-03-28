import { useEffect } from 'react'
import { CssBaseline } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles'
import { AuthProvider } from '../components/AuthenticationContext'
import theme from '../styles/theme'
import '../styles/globals.scss'
import NavigationBar from '../components/NavigationBar'
import ContentLayout from '../components/ContentLayout'

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
				<ContentLayout content={<Component {...pageProps} />} />
			</AuthProvider>
		</ThemeProvider>
	)
}

export default BeerBuddy
