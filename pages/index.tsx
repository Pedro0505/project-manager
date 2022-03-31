import type { NextPage } from 'next';
import styles from '../styles/login.module.css'
import Head from 'next/head';
import Login from '../components/Login';
import Register from '../components/Register';

function Home() {
  return (
    <div>
      <Head>
        <title>Project Manager</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={ styles.containerRegiterLogin }>
        <Register />
        <Login />
      </main>
    </div>
  );
}

export default Home as NextPage;
