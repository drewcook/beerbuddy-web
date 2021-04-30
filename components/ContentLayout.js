import { Container, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import NavigationBar from './NavigationBar'
import styles from '@bb/styles/base.module.scss'

const ContentLayout = ({ content }) => (
	<>
		<div className={styles.mainWrapper}>
			<NavigationBar />
			<main className={styles.mainContent} role="main">
				<Container maxWidth="lg">{content}</Container>
			</main>
		</div>
		<footer className={styles.footer}>
			<Container maxWidth="lg">
				<Typography variant="overline">
					BeerBuddy™{' '}
					<a href="https://altheawebservices.com" target="_blank" rel="noopener noreferrer">
						<small>from Althea Web Services</small>
					</a>
				</Typography>
				<Typography variant="overline">
					&copy; {new Date().getFullYear()}, All Rights Reserved
				</Typography>
			</Container>
		</footer>
	</>
)

ContentLayout.propTypes = {
	content: PropTypes.node.isRequired,
}

export default ContentLayout
