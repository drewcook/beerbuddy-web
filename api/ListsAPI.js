const { RESTDataSource } = require('apollo-datasource-rest')

class ListsAPI extends RESTDataSource {
	constructor() {
		super()
		this.baseURL = `${process.env.BEERBUDDY_API_HOST}/lists`
	}

	willSendRequest(request) {
		request.headers.set('authorization', this.context.token)
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

	async createList({ userId, name }) {
		const data = await this.post('/', { userId, name })
		return data
	}

	async deleteList(id) {
		const data = await this.delete(`/${id}`)
		return data
	}

	async addItemToList({ listId, beerId, breweryId }) {
		const data = await this.patch(`/${listId}/add`, { beerId, breweryId })
		return data
	}

	async removeItemFromList({ listId, beerId, breweryId }) {
		const data = await this.patch(`/${listId}/remove`, { beerId, breweryId })
		return data
	}
}

export default ListsAPI
