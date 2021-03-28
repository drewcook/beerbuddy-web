import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
	AppBar,
	Box,
	Button,
	Container,
	ClickAwayListener,
	MenuItem,
	MenuList,
	Paper,
	Popper,
	Toolbar,
	Typography,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { useAuthentication } from '../components/AuthenticationContext'
import LocalDrinkIcon from '@material-ui/icons/LocalDrink'
import styles from '../styles/navigationbar.module.scss'

const NavigationBar = () => {
	const { isAuthenticated, logOut } = useAuthentication()
	const [isMobile, setIsMobile] = useState(false)
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const checkForMobile = () => setIsMobile(window.innerWidth < 600)

	const handleToggle = () => setOpen(prevOpen => !prevOpen)

	const handleClose = event => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return
		}

		setOpen(false)
	}

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault()
			setOpen(false)
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}

		prevOpen.current = open
	}, [open])

	useEffect(() => {
		checkForMobile()
		window.addEventListener('resize', checkForMobile, true)
		return () => {
			window.removeEventListener('resize', checkForMobile, true)
		}
	}, [])

	const renderMenuList = () => (
		<ClickAwayListener onClickAway={handleClose}>
			<MenuList
				className={isMobile ? styles.menuItemsMobile : styles.menuItems}
				autoFocusItem={open}
				id="mobile-menu"
				onKeyDown={handleListKeyDown}
			>
				<Link href="/dashboard">
					<a onClick={handleClose}>
						<MenuItem>Dashboard</MenuItem>
					</a>
				</Link>
				<Link href="/beer/list">
					<a onClick={handleClose}>
						<MenuItem>Beer</MenuItem>
					</a>
				</Link>
				<Link href="/brewery/list">
					<a onClick={handleClose}>
						<MenuItem>Breweries</MenuItem>
					</a>
				</Link>
				<MenuItem onClick={logOut}>Sign Out</MenuItem>
			</MenuList>
		</ClickAwayListener>
	)

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
								{isMobile ? (
									<>
										<Button
											ref={anchorRef}
											aria-controls={open ? 'mobile-menu' : undefined}
											aria-haspopup="true"
											onClick={handleToggle}
										>
											<MenuIcon />
										</Button>
										<Popper
											open={open}
											anchorEl={anchorRef.current}
											onClose={handleClose}
											role={undefined}
											transition
											disablePortal
										>
											{() => (
												<Paper>
													{renderMenuList()}
													{/* <MenuList
														autoFocusItem={open}
														anchorOrigin={{
															vertical: 'bottom',
															horizontal: 'center',
														}}
														transformOrigin={{ horizontal: 'center', vertical: 250 }}
													>
														<MenuItem onClick={handleClose}>Profile</MenuItem>
														<MenuItem onClick={handleClose}>My account</MenuItem>
														<MenuItem onClick={handleClose}>Logout</MenuItem>
													</MenuList> */}
												</Paper>
											)}
										</Popper>
									</>
								) : (
									renderMenuList()
								)}
							</div>
						)}
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	)
}

export default NavigationBar
