import { Container } from '@material-ui/core'
import NavigationBar from './NavigationBar'
import styles from '../styles/base.module.scss'

const ContentLayout = ({ content }) => (
	<>
		<div className={styles.mainWrapper}>
			<NavigationBar />
			<main className={styles.mainContent} role="main">
				<Container maxWidth="lg">{content}</Container>
			</main>
		</div>
		<footer className={styles.footer}>
			<a href="https://altheawebservices.com" target="_blank" rel="noopener noreferrer">
				Built by Althea Web Services
			</a>
		</footer>
	</>
)

export default ContentLayout
