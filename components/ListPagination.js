import { Box, IconButton, Typography } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import PropTypes from 'prop-types'
import styles from '@bb/styles/pagination.module.scss'

const ListPagination = props => {
	const { pageInfo, onPrevPage, onNextPage } = props
	const { page, totalPages, totalResults } = pageInfo

	return (
		<Box display="flex" alignItems="center" justifyContent="flex-start" my={5}>
			<IconButton
				edge="start"
				aria-label="previous page"
				onClick={onPrevPage}
				disabled={page === 1}
			>
				<ArrowBackIcon />
			</IconButton>
			<Typography className={styles.pageInfo}>
				Page {page} out of {totalPages}
			</Typography>
			<IconButton edge="end" aria-label="previous page" onClick={onNextPage}>
				<ArrowForwardIcon />
			</IconButton>
		</Box>
	)
}

ListPagination.propTypes = {
	pageInfo: PropTypes.shape({
		page: PropTypes.number.isRequired,
		totalPages: PropTypes.number.isRequired,
	}).isRequired,
	onPrevPage: PropTypes.func.isRequired,
	onNextPage: PropTypes.func.isRequired,
}

export default ListPagination
