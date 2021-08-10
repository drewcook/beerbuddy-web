/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

// Cache configuration
const CACHE_NAME = 'v1' // TODO: make this dynamic based on commit SHA

// Install the SW
self.addEventListener('install', e => {
	console.info('Service Worker: Installed')
})

// Activate the SW
self.addEventListener('activate', e => {
	console.info('Service Worker: Activated')

	// Remove unwanted caches
	e.waitUntil(
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
		),
	)
})

/*
	Intercept fetch requests from our web application, complete fetch and then cache the response.
	If we're offline, or the initial fetch fails, serve the response from the cache
*/
self.addEventListener('fetch', e => {
	// Exclude any requests are not GET and any coming from other sources (chrome extensions)
	if (e.request.url.indexOf('http') === -1) return
	if (e.request.method !== 'GET') return

	const response = fetch(e.request)
		.then(res => {
			// Make a clone of the response to cache
			const resClone = res.clone()
			caches.open(CACHE_NAME).then(cache => {
				// TODO: only add if response is not in cache already
				cache.put(e.request, resClone)
			})
			return res
		})
		.catch(err => caches.match(e.request)) // If offline, serve from cache

	e.respondWith(response)
})
