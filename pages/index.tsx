import Head from 'next/head'
import Link from 'next/link';
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TraffikHunt</title>
        <meta name="description" content="Web Traffic Monitoring Made easier than ever" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Link href="/auth/login">Login</Link>
        <Link href="/auth/signup">Signup to traffikhunt</Link>
      </main>
    </div>
  )
}
