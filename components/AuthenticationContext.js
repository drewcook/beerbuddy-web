import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { authService, userService } from '~/api/'

const AuthenticationContext = createContext()

export const AuthProvider = ({ children }) => {
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState(null)

	const checkAuthentication = () => {
		const token = sessionStorage.getItem('auth-token')

		if (token) {
			setIsAuthenticated(true)
		} else {
			setIsAuthenticated(false)
		}
	}

	useEffect(() => {
		checkAuthentication()
	}, [])

	const logIn = async ({ email, password }) => {
		try {
			const token = await authService.authenticateUser({ email, password })
			sessionStorage.setItem('auth-token', token)
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
			setIsAuthenticated(false)
			router.push('/')
		} catch (error) {
			throw new Error(error)
		}
	}

	const getCurrentUser = async () => {
		try {
			const user = await userService.getMe()
			return user
		} catch (error) {
			throw new Error(error)
		}
	}

	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated,
				logIn,
				logOut,
				getCurrentUser,
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
