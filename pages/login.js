import React, { useState} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {
	Box,
	Button,
	CircularProgress,
	Container,
	InputLabel,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Link from 'next/link';
import styles from '../styles/LoginPage.module.scss';
import { authenticateUser } from '../api/auth';

const LoginPage = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		console.log('logging in...');
		try {
			await authenticateUser({ email, password });
			// Redirect back home
			router.push('/');
		} catch (e) {
			setIsSubmitting(false);
			setError(e.message)
		}
	};

	return (
		<>
			<Head><title>Sign Into BeerBuddy</title></Head>
			<Container maxWidth="sm">
				<Paper className={styles.paper}>
					<Typography variant="h3" className={styles.header}>Sign In</Typography>
					<form onSubmit={handleSubmit} noValidate autoComplete="off">
						<Box>
							<InputLabel htmlFor="email">
								<Typography variant="h5" component="span">Email</Typography>
							</InputLabel>
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
						<Box>
							<InputLabel htmlFor="password">
								<Typography variant="h5" component="span">Password</Typography>
							</InputLabel>
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
						{error && <Typography variant="overline" color="error">- {error}</Typography>}
						{isSubmitting
							? <CircularProgress />
							: (
								<Box display="flex" flexDirection="column" alignItems="center" className={styles.submit}>
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
										No account?
										{' '}
										<Link href='/signup'>
											<a>Create a free account</a>
										</Link>
									</Typography>
								</Box>
							)
						}
					</form>
				</Paper>
			</Container>
		</>
	);
};

export default LoginPage;
