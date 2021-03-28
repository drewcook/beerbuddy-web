import Link from 'next/link'
import { AppBar, Box, Container, MenuItem, MenuList, Toolbar, Typography } from '@material-ui/core'
import { useAuthentication } from '../components/AuthenticationContext'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import styles from '../styles/navigationbar.module.scss'

const NavigationBar = () => {
	const { isAuthenticated, logOut } = useAuthentication()

	return (
		<AppBar position="static" color="secondary">
			<Toolbar>
				<Container maxWidth="lg">
					{/* <IconButton>...</IconButton> */}
					<Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
						<Link href="/">
							<a>
								<Typography variant="h5" component="h1" className={styles.appName}>
									<LocalDrinkIcon />
									BeerBuddy™
								</Typography>
							</a>
						</Link>
						{isAuthenticated && (
							<div>
								<MenuList className={styles.menuItems}>
									<Link href="/dashboard">
										<a>
											<MenuItem>Dashboard</MenuItem>
										</a>
									</Link>
									<Link href="/beer/list">
										<a>
											<MenuItem>Beer</MenuItem>
										</a>
									</Link>
									<Link href="/brewery/list">
										<a>
											<MenuItem>Breweries</MenuItem>
										</a>
									</Link>
									<MenuItem onClick={logOut}>Sign Out</MenuItem>
								</MenuList>
							</div>
						)}
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default NavigationBar
