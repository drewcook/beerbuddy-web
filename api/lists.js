import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'
// TODO: set as .env var
const BASE_URL = isProduction ? 'https://beerbuddy-api.herokuapp.com' : 'http://localhost:5280'

export const getUserLists = async userId => {
	try {
		const response = await axios.get(`${BASE_URL}/api/lists/user/${userId}`)
		const lists = response.data
		return lists
	} catch (error) {
		throw new Error(error.response.data)
	}
}

export const createListForUser = async ({ userId, name, beerIds, breweryIds }) => {
	try {
		console.log({ userId })
		const response = await axios.post(`${BASE_URL}/api/lists/`, {
			userId,
			name,
			beerIds,
			breweryIds,
		})
		const lists = response.data
		return lists
	} catch (error) {
		throw new Error(error.response.data)
	}
}
