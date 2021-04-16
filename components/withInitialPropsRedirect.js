import PropTypes from 'prop-types'
import getDisplayName from '@bb/lib/getDisplayName'
import PageLoading from './common/PageLoading'

const withInitialPropsRedirect = ({ initialPropsRedirecting }) => WrappedComponent => {
	const withInitialPropsRedirectComponent = ({ ...props }) => {
		// if we're redirecting from getInitialProps on client, we don't want to render
		if (initialPropsRedirecting) {
			return <PageLoading />
		}
		return <WrappedComponent {...props} />
	}

	withInitialPropsRedirectComponent.propTypes = {
		initialPropsRedirecting: PropTypes.bool,
	}

	withInitialPropsRedirectComponent.defaultProps = {
		initialPropsRedirecting: false,
	}

	withInitialPropsRedirectComponent.displayName = `withInitialPropsRedirect(${getDisplayName(
		WrappedComponent,
	)})`

	return withInitialPropsRedirectComponent
}

export default withInitialPropsRedirect
