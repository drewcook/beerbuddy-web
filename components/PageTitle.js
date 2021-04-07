import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import baseStyles from '@bb/styles/base.module.scss'

const PageTitle = ({ title, headline }) => (
	<Box className={baseStyles.pageTitle}>
		<Typography variant="h5" component="h2">
			{title}
		</Typography>

		{headline && (
			<Typography variant="h2" component="h3" gutterBottom>
				{headline}
			</Typography>
		)}
	</Box>
)

PageTitle.propType = {
	title: PropTypes.string.isRequired,
	headline: PropTypes.string,
}

PageTitle.defaultProps = {
	headline: undefined,
}

export default PageTitle
