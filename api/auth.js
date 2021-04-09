import axios from 'axios'
import getConfig from 'next/config'

const {
	publicRuntimeConfig: { BEERBUDDY_API_HOST },
} = getConfig()

// Authenticate a user based off email and password
export const authenticateUser = async ({ email, password }) => {
	try {
		const response = await axios.post(`${BEERBUDDY_API_HOST}/auth`, { email, password })
		const token = response.data
		return token
	} catch (error) {
		throw new Error(error.response.data)
	}
}
