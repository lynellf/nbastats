import type { NextPage } from 'next'
import Head from 'next/head'
import Indroduction from '../views/Introduction'
import PlayerView from '../views/PlayerView'
import styles from '../styles/App.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Ranking the Greatest NBA Players of All-Time</title>
        <meta name="description" content="An app created by Ezell Frazier" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={styles['content-area']}>
          <section>
            <Indroduction />
          </section>
          <section>
            <PlayerView />
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home
