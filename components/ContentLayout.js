import { Container } from '@material-ui/core'
import styles from '../styles/base.module.scss'

const ContentLayout = props => {
	const { content } = props

	return (
		<main>
			<Container>
				{content}
				<footer className={styles.footer}>
					<a href="https://altheawebservices.com" target="_blank" rel="noopener noreferrer">
						Built by Althea Web Services
					</a>
				</footer>
			</Container>
		</main>
	)
}

export default ContentLayout
