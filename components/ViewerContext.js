import { useQuery, gql } from '@apollo/client'
import _get from 'lodash/get'
import { createContext, useContext } from 'react'

const ViewerContext = createContext()

const VIEWER_QUERY = gql`
	query GetViewer {
		viewer {
			_id
			name
			email
			listIds
		}
	}
`

export const ViewerProvider = ({ children, router }) => {
	const { asPath } = router
	const unauthenticatedRoutes = ['/', '/login', '/create-account']
	const { data, loading, error } = useQuery(VIEWER_QUERY, {
		skip: unauthenticatedRoutes.includes(asPath),
	})

	if (loading || error) return null
	if (error) return 'Error getting viewer'

	return (
		<ViewerContext.Provider value={{ viewer: _get(data, 'viewer') }}>
			{children}
		</ViewerContext.Provider>
	)
}

export const useViewer = () => {
	const context = useContext(ViewerContext)
	if (context === undefined) {
		throw new Error('useViewer must be used within a ViewerProvider component.')
	}
	return context
}

export default ViewerContext
