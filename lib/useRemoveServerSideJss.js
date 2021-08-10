import { useEffect } from 'react'

const useRemoveServerSideJss = () =>
	useEffect(() => {
		// Remove the server-side injected CSS to fix MUI className mismatch errors
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

export default useRemoveServerSideJss
