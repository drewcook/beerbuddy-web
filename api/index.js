import axios from 'axios'
import * as auth from './auth'
import * as breweryDb from './breweryDb'
import * as lists from './lists'
import * as users from './users'

// Setup auth token for authorization
// TODO: not all routes need this header..
axios.interceptors.request.use(
	request => {
		if (sessionStorage.getItem('auth-token')) {
			request.headers['x-auth-token'] = sessionStorage.getItem('auth-token')
		}
		return request
	},
	error => error,
)

export const authService = auth
export const breweryDbService = breweryDb
export const listService = lists
export const userService = users
