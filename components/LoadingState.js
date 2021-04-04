import { Box, CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'

const LoadingState = ({ spinnerSize, spinnerColor, ...rest }) => (
	<Box textAlign="center" m={4} {...rest}>
		<CircularProgress size={spinnerSize} color={spinnerColor} data-testid="loading-spinner" />
	</Box>
)

LoadingState.propTypes = {
	spinnerColor: PropTypes.string,
	spinnerSize: PropTypes.number,
}

LoadingState.defaultProps = {
	spinnerColor: 'primary',
	spinnerSize: 30,
}

export default LoadingState
