/*
	TODO: these need to be moved onto the server to
	make sever-to-server requests with BreweryDB
*/
// BreweryDB API endpoints
import axios from 'axios'
import getConfig from 'next/config'

// Add header for all requests here
// axios.interceptors.request.use(request => {
// 	console.log(request.url)
// 	if (request.url.includes('brewerydb')) {
// 		console.log('add header')
// 		// request.headers['Access-Control-Allow-Origin'] = '*'
// 	}
// })

// These endpoints are setup to be used within Next's getServerSideProps,
// so these requests run on the server and not the client.
const {
	publicRuntimeConfig: {
		BREWERYDB_API_HOST,
		BREWERYDB_SANDBOX_API_HOST,
		BREWERYDB_API_KEY,
		USE_SANDBOX_API,
	},
} = getConfig()

// Support for using the BreweryDB sandbox API instead
const BASE_URL = USE_SANDBOX_API === 'true' ? BREWERYDB_SANDBOX_API_HOST : BREWERYDB_API_HOST
const KEY_PARAM = USE_SANDBOX_API === 'true' ? '' : `?key=${BREWERYDB_API_KEY}`

// @desc Gets all beers
// @access Public
export const getBeers = async page => {
	try {
		const url = `${BASE_URL}/beers${KEY_PARAM}&p=${page}&withBreweries=y`
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
		const url = `${BASE_URL}/beer/${id}${KEY_PARAM}&withBreweries=y`
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
		const url = `${BASE_URL}/breweries${KEY_PARAM}&p=${page}&withLocations=y`
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
		const url = `${BASE_URL}/brewery/${id}${KEY_PARAM}&withLocations=y&withGuilds=y&withSocialAccounts=y`
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
		const url = `${BASE_URL}/glassware${KEY_PARAM}`
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
		const url = `${BASE_URL}/search${KEY_PARAM}&q=${query}&p=${page}&withBreweries=y&withLocations=y`
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
		const url = `${BASE_URL}/locations${KEY_PARAM}&locationType=${type}&p=${page}`
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
		const url = `${BASE_URL}/locations${KEY_PARAM}&countryIsoCode=${country}&p=${page}`
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
		const url = `${BASE_URL}/locations${KEY_PARAM}&region=${state}&p=${page}`
		const response = await axios.get(url)
		return response.data
	} catch (error) {
		throw new Error(error.response.data)
	}
}
