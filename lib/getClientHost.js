const getClientHost = () =>
	process.env.NODE_ENV === 'production' ? 'https://beerbuddy.io' : 'http://localhost:5440'

export default getClientHost
