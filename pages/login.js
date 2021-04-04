import { Box, Button, Container, InputLabel, Paper, TextField, Typography } from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useAuthentication } from '@bb/components/AuthenticationContext'
import LoadingState from '@bb/components/LoadingState'
import baseStyles from '@bb/styles/base.module.scss'
import styles from '@bb/styles/login.module.scss'

const LoginPage = () => {
	const router = useRouter()
	const { logIn } = useAuthentication()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		setError(null)
		try {
			await logIn({ email, password })
			// Redirect to home
			router.push('/')
		} catch (e) {
			setIsSubmitting(false)
			setError(e.message)
		}
	}

	return (
		<>
			<Head>
				<title>Sign Into BeerBuddy</title>
			</Head>
			<Container maxWidth="sm">
				<Paper className={styles.paper}>
					<Typography variant="h3" className={baseStyles.pageTitle}>
						Sign In
					</Typography>
					<form onSubmit={handleSubmit} noValidate autoComplete="off">
						<Box mb={2}>
							<InputLabel htmlFor="email">Email</InputLabel>
							<TextField
								margin="normal"
								variant="outlined"
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								onChange={e => setEmail(e.target.value)}
								value={email}
								fullWidth
							/>
						</Box>
						<Box mb={2}>
							<InputLabel htmlFor="password">Password</InputLabel>
							<TextField
								margin="normal"
								variant="outlined"
								id="password"
								name="password"
								type="password"
								autoComplete="current-password"
								onChange={e => setPassword(e.target.value)}
								value={password}
								fullWidth
							/>
						</Box>
						{error && (
							<Typography variant="overline" color="error">
								{error}
							</Typography>
						)}
						{isSubmitting ? (
							<LoadingState />
						) : (
							<Box
								display="flex"
								flexDirection="column"
								alignItems="center"
								className={styles.submit}
							>
								<Button
									variant="contained"
									color="primary"
									size="large"
									type="submit"
									fullWidth
									disabled={isSubmitting}
								>
									Sign In
								</Button>
								<Typography>
									No account?{' '}
									<Link href="/create-account">
										<a>Create a free account</a>
									</Link>
								</Typography>
							</Box>
						)}
					</form>
				</Paper>
			</Container>
		</>
	)
}

export default LoginPage
