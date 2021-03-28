// BreweryDB API endpoints
import axios from 'axios'
const apiKey = '69ee360e54918c2ed9d0e2d8568dafda'

// @desc Gets all beers
// @access Public
export const getBeers = async page => {
	try {
		const url = `https://api.brewerydb.com/v2/beers?p=${page}&withBreweries=y&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// @desc Gets a beer by ID
// @access Public
export const getBeerDetails = async id => {
	try {
		const url = `https://api.brewerydb.com/v2/beer/${id}?withBreweries=y&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// @desc Gets all breweries
// @access Public
export const getBreweries = async page => {
	try {
		const url = `https://api.brewerydb.com/v2/breweries?p=${page}&withLocations=y&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets a brewery by ID
// // @access Public
// @access Public
export const getBreweryDetails = async id => {
	try {
		const url = `https://api.brewerydb.com/v2/brewery/${id}?withLocations=y&withGuilds=y&withSocialAccounts=y&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets all glassware types
// // @access Public
export const getGlassware = async () => {
	try {
		const url = `https://api.brewerydb.com/v2/glassware?key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets both breweries and beers based off of a query
// // @access Public
const searchBeersAndBreweries = async (query, page) => {
	try {
		const url = `https://api.brewerydb.com/v2/search?q=${query}&p=${page}&withBreweries=y&withLocations=y&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets all breweries based off of a brewery type
// // @access Public
const filterBreweryByType = async (type, page) => {
	try {
		const url = `https://api.brewerydb.com/v2/locations?locationType=${type}&p=${page}&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets all breweries and beers based off of a country
// // @access Public
const filterByCountry = async (country, page) => {
	try {
		const url = `https://api.brewerydb.com/v2/locations?countryIsoCode=${country}&p=${page}&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}

// // @desc Gets all breweries and beers based off of a US state
// // @access Public
const filterByState = async (state, page) => {
	try {
		const url = `https://api.brewerydb.com/v2/locations?region=${state}&p=${page}&key=${apiKey}`
		const response = await axios.get(url)
		return response.data
	} catch (ex) {
		throw new Error(ex.response.data)
	}
}
