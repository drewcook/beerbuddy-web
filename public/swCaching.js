/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

// Cache configuration
const CACHE_NAME = 'v2'
const staticAssets = ['/beer_pint_color.png', '/brewery_vats2.png', 'favicon.ico']
const ORIGIN_WHITELIST = [
	// Development URLS
	'http://localhost:5440',
	'http://localhost:5280',
	// Production URLS
	'https://beerbuddy-web.herokuapp.com',
	'https://beerbuddy-api.herokuapp.com',
	'https://beerbuddy.io',
	'https://api.beerbuddy.io',
	// Google Fonts
	'https://fonts.gstatic.com',
	'https://fonts.googleapis.com',
	// Brewery DB URLS
	'https://brewerydb-images.s3.amazonaws.com',
]

const precache = () => {
	// Add all known, used static assets to cache
	caches
		.open(CACHE_NAME)
		.then(cache => cache.addAll(staticAssets))
		.then(() => {
			console.info('Service Worker: Static assets added to cache')
		})
}

const clearCache = () => {
	// Remove unwanted cache
	caches.keys().then(cacheNames =>
		Promise.all(
			cacheNames.map(cache => {
				if (cache !== CACHE_NAME) {
					console.info('Service Worker: Clearing old cache')
					return caches.delete(cache)
				}
				return cache
			}),
		),
	)
}

const handleResponse = req =>
	fetch(req)
		.then(res => {
			// Make a clone of the response to cache
			const clone = res.clone()
			caches.open(CACHE_NAME).then(cache => cache.put(req, clone))
			// return the original response
			return res
		})
		.catch(err => {
			console.error(`Service Worker Error: ${err.message}`)
			// If offline, serve from cache
			return caches.match(req)
		})

// Install the SW
self.addEventListener('install', e => {
	console.info('Service Worker: Installed')
	e.waitUntil(precache())
})

// Activate the SW
self.addEventListener('activate', e => {
	console.info('Service Worker: Activated')
	e.waitUntil(clearCache())
})

// Intercept all supported GET requests
self.addEventListener('fetch', e => {
	const { origin } = new URL(e.request.url)
	const isGetRequest = e.request.method === 'GET'

	if (ORIGIN_WHITELIST.includes(origin) && isGetRequest) {
		e.respondWith(handleResponse(e.request))
	}
})
