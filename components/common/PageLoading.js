import { Box } from '@material-ui/core'
import baseStyles from '@bb/styles/base.module.scss'
import LoadingState from '../LoadingState'

const PageLoading = () => (
	<Box className={baseStyles.centered}>
		<LoadingState />
	</Box>
)

export default PageLoading
