/* eslint-disable no-console */
import { useEffect } from 'react'

const registerCaching = () => {
	navigator.serviceWorker
		.register('/swCaching.js') // stored in public/
		.then(registration => console.info(`Service Worker: Registered in scope ${registration.scope}`))
		.catch(err => console.warn('Service Worker: Failed to register with error', err))
}

const useServiceWorkers = () =>
	useEffect(() => {
		if ('serviceWorker' in navigator) {
			// Register caching and offline use
			window.addEventListener('load', registerCaching)

			// Cleanup registrations on unmount
			return () => {
				navigator.serviceWorker.removeEventListener('load', registerCaching)
			}
		}
	}, [])

export default useServiceWorkers
