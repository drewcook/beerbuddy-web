import { Box, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PropTypes from 'prop-types'
import styles from '@bb/styles/pagination.module.scss'

const ListPagination = props => {
	const { pageInfo, onPrevPage, onNextPage } = props
	const { currentPage, numberOfPages, totalResults } = pageInfo

	return (
		<>
			<Typography gutterBottom>{totalResults} results</Typography>
			<Box display="flex" alignItems="center" justifyContent="flex-start" my={5}>
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
				<IconButton edge="end" aria-label="previous page" onClick={onNextPage}>
					<ArrowForwardIcon />
				</IconButton>
			</Box>
		</>
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
