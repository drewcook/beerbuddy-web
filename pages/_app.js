import { useEffect } from 'react';
import { AppBar, Container, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
import '../styles/globals.scss'

const BeerBuddy = (props) => {
	const { Component, pageProps } = props;

	useEffect(() => {
		// Remove the server-side injected CSS to fix MUI className mismatch errors
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

  return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{/* navigation */}
				<AppBar position="static">
					<Container>
						app bar here
					</Container>
				</AppBar>
				{/* content */}
				<Container>
					<Component {...pageProps} />
				</Container>
			</ThemeProvider>
		</>
	);
};

export default BeerBuddy;
