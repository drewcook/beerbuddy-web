import PropTypes from 'prop-types'
import getDisplayName from '@bb/lib/getDisplayName'
import PageLoading from './common/PageLoading'

export default () => WrappedComponent => {
	const withInitialPropsRedirect = ({ initialPropsRedirecting, ...props }) => {
		// if we're redirecting from getInitialProps on client, we don't want to render
		if (initialPropsRedirecting) {
			return <PageLoading />
		}
		return <WrappedComponent {...props} />
	}

	withInitialPropsRedirect.propTypes = {
		initialPropsRedirecting: PropTypes.bool,
	}

	withInitialPropsRedirect.defaultProps = {
		initialPropsRedirecting: false,
	}

	withInitialPropsRedirect.displayName = `withInitialPropsRedirect(${getDisplayName(
		WrappedComponent,
	)})`

	return withInitialPropsRedirect
}
