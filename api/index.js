import axios from 'axios'
import * as auth from './auth'
import * as breweryDb from './breweryDb'
import * as lists from './lists'
import * as users from './users'

// Setup auth token for authorization header on all axios calls
axios.interceptors.request.use(
	request => {
		// Exclude adding this for BreweryDB endpoints
		// TODO: not all routes need this header..
		if (!request.url.includes('brewerydb.com')) {
			if (sessionStorage.getItem('auth-token')) {
				request.headers['x-auth-token'] = sessionStorage.getItem('auth-token')
			}
		}

		return request
	},
	error => error,
)

export const authService = auth
export const breweryDbService = breweryDb
export const listService = lists
export const userService = users
