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

	// Favorites
	async getFavorites(id) {
		const data = await this.get(`/${id}/favorites`)
		return data
	}

	async addUserFavorite({ userId, itemId, name, type }) {
		const data = await this.put(`/${userId}/favorites`, { itemId, name, type })
		return data
	}

	async removeUserFavorite({ userId, favoriteId }) {
		const data = await this.delete(`/${userId}/favorites/${favoriteId}`)
		return data
	}
}

export default UsersAPI
