const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = `${process.env.BEERBUDDY_API_HOST}/users`
	}

	willSendRequest(request) {
		request.headers.set('authorization', this.context.token)
	}

	async createUser(params) {
		const data = await this.post('/', params)
		return data
	}

	async getUsers() {
		const data = await this.get('/')
		return data
	}

	async getUser(id) {
		const data = await this.get(`/${id}`)
		return data
	}

	async getMe() {
		const data = await this.get('/me')
		return data
	}
}

export default UsersAPI
