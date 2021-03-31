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
		request.headers.set('x-auth-token', this.context.token)
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
