import { Box, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PropTypes from 'prop-types'
import styles from '@bb/styles/pagination.module.scss'

const ListPagination = props => {
	const { pageInfo, onPrevPage, onNextPage } = props
	const { currentPage, numberOfPages, totalResults } = pageInfo

	if (!pageInfo) return null

	return (
		<Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mb={5}>
			<Box display="flex" alignItems="center" justifyContent="flex-start">
				<IconButton
					edge="start"
					aria-label="previous page"
					onClick={onPrevPage}
					disabled={currentPage === 1}
				>
					<ArrowBackIcon />
				</IconButton>
				<Typography className={styles.pageInfo}>
					Page {currentPage} out of {numberOfPages}
				</Typography>
				<IconButton
					edge="end"
					aria-label="previous page"
					onClick={onNextPage}
					disabled={currentPage === numberOfPages}
				>
					<ArrowForwardIcon />
				</IconButton>
			</Box>
			<Typography variant="overline" component="p">
				{totalResults} results
			</Typography>
		</Box>
	)
}

ListPagination.propTypes = {
	pageInfo: PropTypes.shape({
		currentPage: PropTypes.number.isRequired,
		numberOfPages: PropTypes.number.isRequired,
		totalResults: PropTypes.number.isRequired,
	}).isRequired,
	onPrevPage: PropTypes.func.isRequired,
	onNextPage: PropTypes.func.isRequired,
}

export default ListPagination
