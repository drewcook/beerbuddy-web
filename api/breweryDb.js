// BreweryDB API endpoints
import axios from 'axios'
import getConfig from 'next/config'

const {
	publicRuntimeConfig: { breweryDBApiHost, breweryDBApiKey },
} = getConfig()

// @desc Gets all beers
// @access Public
export const getBeers = async page => {
	try {
		const url = `${breweryDBApiHost}/beers?p=${page}&withBreweries=y&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error)
	}
}

// @desc Gets a beer by ID
// @access Public
export const getBeerDetails = async id => {
	try {
		const url = `${breweryDBApiHost}/beer/${id}?withBreweries=y&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		console.error(error)
		throw new Error(error.response.data)
	}
}

// @desc Gets all breweries
// @access Public
export const getBreweries = async page => {
	try {
		const url = `${breweryDBApiHost}/breweries?p=${page}&withLocations=y&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets a brewery by ID
// // @access Public
// @access Public
export const getBreweryDetails = async id => {
	try {
		const url = `${breweryDBApiHost}/brewery/${id}?withLocations=y&withGuilds=y&withSocialAccounts=y&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets all glassware types
// // @access Public
export const getGlassware = async () => {
	try {
		const url = `${breweryDBApiHost}/glassware?key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets both breweries and beers based off of a query
// // @access Public
const searchBeersAndBreweries = async (query, page) => {
	try {
		const url = `${breweryDBApiHost}/search?q=${query}&p=${page}&withBreweries=y&withLocations=y&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets all breweries based off of a brewery type
// // @access Public
const filterBreweryByType = async (type, page) => {
	try {
		const url = `${breweryDBApiHost}/locations?locationType=${type}&p=${page}&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets all breweries and beers based off of a country
// // @access Public
const filterByCountry = async (country, page) => {
	try {
		const url = `${breweryDBApiHost}/locations?countryIsoCode=${country}&p=${page}&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}

// // @desc Gets all breweries and beers based off of a US state
// // @access Public
const filterByState = async (state, page) => {
	try {
		const url = `${breweryDBApiHost}/locations?region=${state}&p=${page}&key=${breweryDBApiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}
