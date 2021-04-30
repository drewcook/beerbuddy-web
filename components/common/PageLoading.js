import { Box } from '@material-ui/core'
import LoadingState from '../LoadingState'
import baseStyles from '@bb/styles/base.module.scss'

const PageLoading = () => (
	<Box className={baseStyles.centered}>
		<LoadingState />
	</Box>
)

export default PageLoading
