import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'
// TODO: set as .env var
const BASE_URL = isProduction ? 'https://beerbuddy-api.herokuapp.com' : 'http://localhost:5280'

// Authenticate a user based off email and password
export const authenticateUser = async ({ email, password }) => {
	try {
		const response = await axios.post(`${BASE_URL}/api/auth`, { email, password })
		const token = response.data
		return token
	} catch (error) {
		throw new Error(error.response.data)
	}
}
