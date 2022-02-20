import React from 'react';
import styles from './App.scss';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.main}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
