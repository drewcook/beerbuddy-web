import Head from 'next/head'
import { Button, Typography } from '@material-ui/core';
import Link from 'next/link';
import styles from '../styles/HomePage.module.scss'

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>BeerBuddy - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Typography variant="h2">
          Welcome to BeerBuddy!
				</Typography>

        <Typography>
					We keep track of your drinking habits so you don't have to!  Cheers!
				</Typography>

				<Link href="/login">
					<a>
						<Button color="primary" size="large" variant="contained">Login</Button>
					</a>
				</Link>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://altheawebservices.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by Althea Web Services
        </a>
      </footer>
    </div>
  )
};

export default HomePage;
