const { RESTDataSource } = require('apollo-datasource-rest')

class BreweryDbAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = `${process.env.BEERBUDDY_API_HOST}/brewerydb`
	}

	willSendRequest(request) {
		request.headers.set('authorization', this.context.token)
	}

	async getBeer(page) {
		const data = await this.post('/beer', { page })
		return data
	}

	async getBeerDetails(id) {
		const data = await this.get(`/beer/${id}`)
		return data.data
	}

	async getBreweries(page) {
		const data = await this.post('/breweries', { page })
		return data
	}

	async getBreweryDetails(id) {
		const data = await this.get(`/brewery/${id}`)
		return data.data
	}

	async getGlassware() {
		const data = await this.get('/glassware')
		return data
	}

	async search({ page, query }) {
		const data = await this.post('/search', { page, query })
		return data
	}

	async filterByBreweryType({ page, type }) {
		const data = await this.post('/filter/breweries', { page, type })
		console.log('filtered data', data.data[0])
		return data
	}

	async filterByCountry({ page, country }) {
		const data = await this.post('/filter/location/countries', { page, country })
		console.log('filtered data', data.data[0])
		return data
	}

	async filterByState({ page, state }) {
		const data = await this.post('/filter/location/states', { page, state })
		console.log('filtered data', data.data[0])
		return data
	}
}

export default BreweryDbAPI
