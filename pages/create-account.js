import React, { useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Box, Button, Container, InputLabel, Paper, TextField, Typography } from '@material-ui/core'
import LoadingState from '../components/LoadingState'
import { userService } from '../api/'
import { useAuthentication } from '../components/AuthenticationContext'
import styles from '../styles/login.module.scss'
import baseStyles from '../styles/base.module.scss'

const CreateAccountPage = () => {
	const router = useRouter()
	const { logIn } = useAuthentication()
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [error, setError] = useState(null)

	const handleSubmit = async e => {
		e.preventDefault()
		setIsSubmitting(true)
		setError(null)
		try {
			// TODO: wire this up, then sign them in, then redirect to hom
			const user = await userService.createAccount({ name, email, password })
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
						Create An Account
					</Typography>
					<form onSubmit={handleSubmit} noValidate autoComplete="off">
						<Box mb={2}>
							<InputLabel htmlFor="email">Full Name</InputLabel>
							<TextField
								margin="normal"
								variant="outlined"
								id="name"
								name="name"
								type="text"
								onChange={e => setName(e.target.value)}
								value={name}
								fullWidth
							/>
						</Box>
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
									Submit
								</Button>
								<Typography>
									Already have an account?{' '}
									<Link href="/login">
										<a>Sign in</a>
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

export default CreateAccountPage
