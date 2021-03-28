import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { authenticateUser } from '../api/auth'

const AuthenticationContext = createContext()

export const AuthProvider = ({ children }) => {
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [authToken, setAuthToken] = useState(null)

	const checkAuthentication = () => {
		const token = sessionStorage.getItem('auth-token')

		if (token) {
			setIsAuthenticated(true)
			setAuthToken(token)
		}
	}

	useEffect(() => {
		checkAuthentication()
	}, [])

	const logIn = async ({ email, password }) => {
		try {
			const token = await authenticateUser({ email, password })
			sessionStorage.setItem('auth-token', token)
			// TODO: set an expiry?
			setAuthToken(token)
			setIsAuthenticated(true)
		} catch (error) {
			throw new Error(error)
		}
	}

	const logOut = () => {
		try {
			const token = sessionStorage.getItem('auth-token')
			if (!token) throw new Error('No token found')
			sessionStorage.removeItem('auth-token')
			setAuthToken(null)
			setIsAuthenticated(false)
			router.push('/')
		} catch (error) {
			throw new Error(error)
		}
	}

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated,
				authToken,
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
