import axios from 'axios'
import { getUserLists } from './lists'

const isProduction = process.env.NODE_ENV === 'production'
// TODO: set as .env var
const BASE_URL = isProduction ? 'https://beerbuddy-api.herokuapp.com' : 'http://localhost:5280'

// This creates a new user record
export const createAccount = async ({ name, email, password }) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/users`, { name, email, password })
		const user = response.data
		return user
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// This gets the current authenticated user based off the 'auth-token' in session storage
export const getMe = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/api/users/me`)
		const user = response.data
		return user
	} catch (error) {
		throw new Error(error.response.data)
	}
}

export const getUserDashboard = async () => {
	try {
		const user = await getMe()

		const lists = await getUserLists(user._id)

		console.log({ lists })

		return {
			lists,
			user,
		}
	} catch (error) {
		throw new Error(error.response.data)
	}
}
