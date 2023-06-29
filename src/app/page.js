'use client'

import styles from './page.module.css';
import Form from '../../components/calculate-cost';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Form />
      </div>
    </main>
  )
}
