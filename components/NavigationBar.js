import { AppBar, Box, Button, Container, Typography } from '@material-ui/core';
import { useAuthentication } from '../components/AuthenticationContext';

const NavigationBar = () => {
	const { isAuthenticated, logOut } = useAuthentication();

	return (
		<div>
			<AppBar position="static" color="secondary">
				<Container>
					<Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
						<Typography>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</Typography>
						{isAuthenticated && (
							<Button variant="contained" color="primary" onClick={logOut}>
								Log Out
							</Button>
						)}
					</Box>
				</Container>
			</AppBar>
		</div>
	);
};

export default NavigationBar;
