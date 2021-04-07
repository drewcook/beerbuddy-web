import axios from 'axios'
import getConfig from 'next/config'

const {
	publicRuntimeConfig: { beerBuddyApiHost },
} = getConfig()

// Authenticate a user based off email and password
export const authenticateUser = async ({ email, password }) => {
	try {
		const response = await axios.post(`${beerBuddyApiHost}/auth`, { email, password })
		const token = response.data
		return token
	} catch (error) {
		throw new Error(error.response.data)
	}
}
