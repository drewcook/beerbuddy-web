import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import PropTypes from 'prop-types'
import { createContext, useContext, useState, useEffect } from 'react'
import { authenticateUser } from '@bb/api/auth'
import LoadingState from './LoadingState'

const AuthenticationContext = createContext()

export const AuthProvider = ({ apolloClient, children }) => {
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(null)

	const logIn = async ({ email, password }) => {
		try {
			const token = await authenticateUser({ email, password })
			// Set an isomorphic cookie
			setCookie(null, 'authToken', token, {
				// httpOnly: true,
				secure: true,
			})
			// Set local state
			setIsAuthenticated(true)
			// start fresh and refresh queries - technically should be cleared from logout
			apolloClient.resetStore()
		} catch (error) {
			throw new Error(error)
		}
	}

	const logOut = () => {
		try {
			const token = parseCookies(null).authToken
			if (!token) throw new Error('No token found')
			// Destroy the isomorphic cookie
			destroyCookie(null, 'authToken')
			// Reset local state
			setIsAuthenticated(false)
			// Redirect to root
			router.push('/')
			// clear apollo cache, but don't refresh queries after
			apolloClient.clearStore()
		} catch (error) {
			throw new Error(error)
		}
	}

	useEffect(async () => {
		// Check to see if a token exists to set initial state
		const token = await parseCookies(null).authToken
		setIsAuthenticated(token ? true : false)
	}, [])

	if (isAuthenticated === null) return <LoadingState />

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated,
				logIn,
				logOut,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	)
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export const useAuthentication = () => {
	const context = useContext(AuthenticationContext)
	if (context === undefined) {
		throw new Error('useAuthentication must be used within an AuthProvider component.')
	}
	return context
}

export default AuthenticationContext
