import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'
// TODO: set as .env var
const BASE_URL = isProduction ? 'https://beerbuddy-api.herokuapp.com' : 'http://localhost:5280'

export const getList = async listId => {
	try {
		const response = await axios.get(`${BASE_URL}/api/lists/${listId}`)
		const lists = response.data
		return lists
	} catch (error) {
		throw new Error(error.response.data)
	}
}

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

export const addBeerToList = async ({ listId, beerId, name }) => {
	try {
		// TODO: should this take in beerId or [beerId]?
		const list = await getList(listId)
		const response = await axios.put(`${BASE_URL}/api/lists/${listId}`, {
			name: list.name,
			beerIds: [...list.beerIds, beerId],
		})
		console.log(response)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}
