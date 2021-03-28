import React from 'react'
import { Button } from '@material-ui/core'

const DashboardPage = WrappedComponent => props => {
	const handleHello = msg => {
		console.log(msg)
	}
	return <div onClick={() => handleHello('woah')}>hello world</div>
}

export default DashboardPage
