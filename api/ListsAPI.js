const { RESTDataSource } = require('apollo-datasource-rest')

// TODO: set as .env var
const isProduction = process.env.NODE_ENV === 'production'
const BASE_URL = isProduction ? 'https://beerbuddy-api.herokuapp.com' : 'http://localhost:5280'

class UsersAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = `${BASE_URL}/api/lists`
	}

	willSendRequest(request) {
		// TODO: use this.context.token somehow
		request.headers.set(
			'x-auth-token',
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDVmNWU2NjdlYmI3Njk4ZDFkMzhkYzgiLCJpYXQiOjE2MTcxNTc4NDZ9.A4y-3JS7pYayZYSfsABc-Pq0J7OFirRTsfNYzNAc6_4',
		)
	}

	async getLists() {
		const data = await this.get('/')
		return data
	}

	async getList(id) {
		const data = await this.get(`/${id}`)
		return data
	}

	async getListsForUser(userId) {
		const data = await this.get(`/user/${userId}`)
		return data
	}
}

export default UsersAPI
