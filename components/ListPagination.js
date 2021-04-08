import { Box, IconButton, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import PropTypes from 'prop-types'

const ListPagination = ({ pageInfo }) => {
	const { page, totalPages } = pageInfo

	const handlePrevPage = () => {
		console.log('prev page')
	}

	const handleNextPage = () => {
		console.log('next page')
	}

	return (
		<Box display="flex" alignItems="center" justifyContent="flex-start" my={5}>
			<IconButton edge="start" aria-label="previous page" onClick={handlePrevPage}>
				<ArrowBackIosIcon />
			</IconButton>
			<Typography>
				Page {page} out of {totalPages}
			</Typography>
			<IconButton edge="end" aria-label="previous page" onClick={handleNextPage}>
				<ArrowForwardIosIcon />
			</IconButton>
		</Box>
	)
}

ListPagination.propTypes = {
	pageInfo: PropTypes.shape({
		page: PropTypes.number.isRequired,
		totalPages: PropTypes.number.isRequired,
	}).isRequired,
}

export default ListPagination
